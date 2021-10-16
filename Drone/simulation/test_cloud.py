# 2021년 한이음 프로젝트
# 프로젝트명 : 콜드론
# 팀명 : 인터셉터
# 마지막 수정일 : 2021-07-31

# Simulation 버전


# {
#     "status": "ready",
#     "start": { "name": "", "address": "", "lat": 37.275937, "lon": 127.132436 },
#     "end": { "name": "", "address": "", "lat": 37.274118, "lon": 127.129474 },
#     "box": 2
#   }


from __future__ import print_function
from dronekit import connect, VehicleMode, LocationGlobalRelative
from pymavlink import mavutil

import sys, os
import time
import uuid
import asyncio
import json
import math
import threading

received_all_event = threading.Event()

##### Connect to AWS IoT Core
##### 연결 전, 인증경로(.env)가 올바르게 설정되었는지 확인할 것!!

sys.path.append('../../Cloud')
import cloud_iot

cloud_connect = cloud_iot.Connection()

command_check = False

##### Connect to simulation 

connection = '127.0.0.1:14550'

print(f'시뮬레이션 드론에 연결 중 : {connection}')

class Drone:
    def __init__(self, vehicle, model):
        self.vehicle = vehicle
        self.model = model
        self.uid = str(uuid.uuid4())
        self.drone_id = self.uid.split('-')[4]


    def getId(self):
        return self.drone_id

    def getUUID(self):
        return self.uid
    
    def getModel(self):
        return self.model
    
    def armCheck(self):
        global start_time
        start_time = time.time()

        while((time.time() - start_time) % 60 < 30):
            cloud_connect.sendMessage({
                'status': 'arming',
                'lat': 0,
                'lon': 0,
                'time': 0
            }, 'delivery/response')
            while not self.vehicle.is_armable:
                print(f'{self.drone_id} : 드론 기본 상태 확인 중...')
                time.sleep(1)
            
            self.vehicle.mode = VehicleMode("GUIDED")
            self.vehicle.armed = True

            while not self.vehicle.armed:
                print(f'드론 모터 실행하라고 전송 중...')
                time.sleep(1)
            
            return True
        cloud_connect.sendMessage({
            'status': 'arm_fail',
            'lat': 0,
            'lon': 0,
            'time': 0
        }, 'delivery/response')
        print('지연 초과로 드론을 작동시키지 못했습니다.')
        return False
    
    def takeOffAlitude(self, air_speed, set_alt):
        global command_check
        self.vehicle.airspeed = air_speed
        cal_alt = set_alt * 2
        
        print('드론 이륙!!!')
        self.vehicle.simple_takeoff(set_alt)

        while True:
            drone_alt = self.vehicle.location.global_relative_frame.alt
            print(f'현재 고도 : {drone_alt}')
            if(drone_alt >= cal_alt * 0.5):
                print(f'목표 고도에 도달 : {set_alt}')
                command_check = True
                break
            time.sleep(1)

    def calculateTime(self, speed, distance):
        left = round(((distance / speed) * 60) / 3600)
        if(left < 1):
            left = 1
        return left

    
    def sendBodyVelocity(self, x, y, z, duration = 0):
        msg = self.vehicle.message_factory.set_position_target_local_ned_encode(
        0,       
        0, 0,    
        mavutil.mavlink.MAV_FRAME_BODY_NED, 
        0b0000111111000111, 
        0, 0, 0, 
        x, y, z, 
        0, 0, 0, 
        0, 0)

        for x in range(0, duration):
            self.vehicle.send_mavlink(msg)
            time.sleep(1)

    def getDistanceMetres(self, aLocation1, aLocation2):
        dlat = aLocation2.lat - aLocation1.lat
        dlong = aLocation2.lon - aLocation1.lon
        result = (math.sqrt((dlat*dlat) + (dlong*dlong)) * 1.113195e5) 
        return round(result, 3)

    def landingAndShutdown(self):
        global start_time
        global location_point
        print("드론 착륙!!!")
        self.vehicle.mode = VehicleMode("LAND")

        while True:
            set_alt = 0.2
            drone_alt = self.vehicle.location.global_relative_frame.alt
            print(f'착륙 고도 : {drone_alt}')
            if(drone_alt <= set_alt * 0.95):
                print(f'목표 고도에 도달 : {set_alt}')
                cloud_connect.sendMessage({
                    'status': 'complete',
                    'lat': self.checkCurrentLocation()['lat'],
                    'lon': self.checkCurrentLocation()['lon'],
                    'time': 0
                }, 'delivery/request')
                cloud_connect.sendMessage({
                    'status': 'complete',
                    'lat': self.checkCurrentLocation()['lat'],
                    'lon': self.checkCurrentLocation()['lon'],
                    'time': 0
                }, 'delivery/response')
                cloud_connect.sendMessage({
                    'drone_id': self.getId(),
                    "model": self.getModel(),
                    "start": location_point["start"].copy(),
                    "end": location_point["end"].copy(),
                    'time': round((time.time() - start_time) % 60 / 60, 2)
                }, 'database')
                break
            time.sleep(1)
            
        self.vehicle.close()

    def droneStatusLog(self):
        log = {
            "GPS": str(self.vehicle.gps_0),
            "Heartbeat": str(self.vehicle.last_heartbeat),
            "Mode": str(self.vehicle.mode.name),
            "System Status": str(self.vehicle.system_status.state),
            "Armable": self.vehicle.is_armable,
            "Current Location": self.checkCurrentLocation()
        }
        return log

    def checkBattery(self):
        bat = self.vehicle.battery
        # result = {
        #     "voltage": bat.voltage,
        #     "current": bat.current,
        #     "level": bat.level
        # }
        # return result
        return bat.current

    def checkCurrentLocation(self):
        current_gps=self.vehicle.location.global_relative_frame
        current = {
            "lon": current_gps.lon,
            "lat": current_gps.lat,
            "alt": current_gps.alt
        }
        return current

async def connectDrone():
        return connect(connection, wait_ready=True)

def listenCallback(topic, payload):
    global drone
    global location_point
    global received_all_event
    data = json.loads(payload)
    if(data['status'] == 'ready'):
        location_point = data.copy()
        time.sleep(5)
        if(drone.armCheck()):
            drone.takeOffAlitude(3, 1.5)
        else:
            print('드론 상태를 점검 후 다시 실행해 주세요!') 
    if(data['status'] == 'complete' or data['status'] == 'cancel'):
        print('status completed')
        received_all_event.set()

loop = asyncio.get_event_loop()
drone = Drone(loop.run_until_complete(connectDrone()), 'ICT-01')

current_id = drone.getId()
print(f'{current_id}')

start_time = 0
location_point = dict()

cloud_connect.listenMessage('delivery/request', listenCallback)

##### 드론 앞, 뒤, 좌, 우 테스트 

# drone.sendBodyVelocity(0, 2, 0, 3)
# time.sleep(2)
# drone.sendBodyVelocity(0, -2, 0, 3)
# time.sleep(2)
# drone.sendBodyVelocity(2, 0, 0, 3)
# time.sleep(2)
# drone.sendBodyVelocity(-2, 0, 0, 3)
# time.sleep(2)

# drone.landingAndShutdown()

##### 드론 목적지까지 이동
while(True):
    end_check = False
    if(command_check):
        point1 = LocationGlobalRelative(location_point["end"]["lat"], location_point["end"]["lon"], 1.5)
        drone.vehicle.simple_goto(point1)

        current_location = drone.vehicle.location.global_relative_frame

        print(current_location)
        print(point1)

        while True:
            left_distance = drone.getDistanceMetres(current_location, point1)
            if(left_distance > 0.6):
                print(f'남은 거리 : {left_distance}m')
                cloud_connect.sendMessage({
                    'status': 'flying',
                    'lat': drone.checkCurrentLocation()['lat'],
                    'lon': drone.checkCurrentLocation()['lon'],
                    'time': drone.calculateTime(drone.vehicle.groundspeed, left_distance)
                }, 'delivery/response')
                cloud_connect.sendMessage({
                    'id': '#' + str(current_id),
                    'model': drone.getModel(),
                    'status': 'ON',
                    'altitude': '',
                    'battery': drone.checkBattery(),
                    'temperature': 25,
                    'gps': 'ON',
                    'connection': 'ON',
                    'speed': 3,
                    'rotation': 0,
                    'location': { 'lat': drone.checkCurrentLocation()['lat'], 'lon': drone.checkCurrentLocation()['lon'] }
                }, 'drone')
            else:
                time.sleep(1)
                drone.landingAndShutdown()
                end_check = True
                break
            current_location = drone.vehicle.location.global_relative_frame
            time.sleep(1)
    if(end_check):
        print("mission end")
        cloud_connect.sendMessage({
            # Request MQTT need!!!!
                }, 'database')
        break
    time.sleep(1)





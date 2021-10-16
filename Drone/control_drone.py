# 2021년 한이음 프로젝트
# 프로젝트명 : 콜드론
# 팀명 : 인터셉터
# 마지막 수정일 : 2021-10-13

from __future__ import print_function
from dronekit import connect, VehicleMode, LocationGlobalRelative
from pymavlink import mavutil

import sys, os
import time
import uuid
import json
import math
import threading

received_all_event = threading.Event()

import check_depth as cam

##### Connect to AWS IoT Core
##### 연결 전, 인증경로(.env)가 올바르게 설정되었는지 확인할 것!!

sys.path.append('../Cloud')
import cloud_iot

cloud_connect = cloud_iot.Connection()

##### Connect to simulation 

connection = '/dev/serial0'

print(f'시뮬레이션 드론에 연결 중 : {connection}')

class Drone:
    def __init__(self, vehicle, model):
        self.vehicle = vehicle
        self.model = model
        self.uid = str(uuid.uuid4())
        self.drone_id = self.uid.split('-')[4]
        self.total_distance = 0
        self.user_id = ''

    def getId(self):
        return self.drone_id

    def getUUID(self):
        return self.uid

    def getModel(self):
        return self.model

    def setTotalDistance(self, total):
        self.total_distance = total

    def setUserId(self, id):
        self.user_id = id
    
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
        
        print('드론 이륙!!!')
        self.vehicle.simple_takeoff(set_alt)

        cloud_connect.sendMessage({
            'status': 'flying',
            'lat': self.checkCurrentLocation()['lat'],
            'lon': self.checkCurrentLocation()['lon'],
            'time': 0
        }, 'delivery/response')

        while True:
            drone_alt = self.vehicle.location.global_relative_frame.alt
            print(f'현재 고도 : {drone_alt}')
            if(drone_alt >= set_alt * 0.8):
                print(f'목표 고도에 도달 : {set_alt}')
                command_check = True
                break
            time.sleep(1)

    def set_velocity_body(self, vx, vy, vz):
        msg = self.vehicle.message_factory.set_position_target_local_ned_encode(
                0,
                0, 0,
                mavutil.mavlink.MAV_FRAME_BODY_NED,
                0b0000111111000111, 
                0, 0, 0,       
                vx, vy, vz,     
                0, 0, 0,        
                0, 0)
        self.vehicle.send_mavlink(msg)
        self.vehicle.flush()


    def condition_yaw(self, heading, relative=False):
        if relative:
            is_relative = 1 
        else:
            is_relative = 0 
        msg = self.vehicle.message_factory.command_long_encode(
            0, 0,    
            mavutil.mavlink.MAV_CMD_CONDITION_YAW,
            0, 
            heading,   
            0,          
            -1,          
            is_relative,
            0, 0, 0)   
        self.vehicle.send_mavlink(msg)

    def get_bearing(self, aLocation1, aLocation2):	
        off_x = aLocation2.lon - aLocation1.lon
        off_y = aLocation2.lat - aLocation1.lat
        bearing = 90.00 + math.atan2(-off_y, off_x) * 57.2957795
        if bearing < 0:
            bearing += 360.00
        return bearing

    def getDistanceMetres(self, aLocation1, aLocation2):
        dlat = aLocation2.lat - aLocation1.lat
        dlong = aLocation2.lon - aLocation1.lon
        result = (math.sqrt((dlat*dlat) + (dlong*dlong)) * 1.113195e5) 
        return result

    def landingAndShutdown(self):
        global start_time
        global location_point

        print("드론 착륙!!!")
        self.vehicle.mode = VehicleMode("LAND")

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
            'user_id': self.user_id,
            'drone_data': {
                'drone_id': self.getId(),
                "model": self.getModel(),
                "start": location_point["start"].copy(),
                "end": location_point["end"].copy(),
                'time': round((time.time() - start_time) % 60 / 60, 2),
                'distance': round(self.total_distance / 1000, 2)
            }
        }, 'database')

        self.vehicle.armed = False
        drone.controlServo(False)
        self.vehicle.close()

    def sendCurrentLog(self, cloud, left_distance, current=None):
        cloud.sendMessage({
            'status': 'flying',
            'lat': drone.checkCurrentLocation()['lat'],
            'lon': drone.checkCurrentLocation()['lon'],
            'time': drone.calculateTime(drone.vehicle.groundspeed, left_distance)
        }, 'delivery/response')
        cloud.sendMessage({
            'id': '#' + str(self.getId())[0:5],
            'model': self.getModel(),
            'status': 'ON',
            'altitude': round(self.checkCurrentLocation()['alt'], 1),
            'battery': int(self.vehicle.battery.current),
            'temperature': 25,
            'gps': 'ON',
            'connection': 'ON',
            'speed': round(self.vehicle.airspeed, 1),
            'rotation': 0,
            'location': { 'lat': self.checkCurrentLocation()['lat'], 'lon': self.checkCurrentLocation()['lon'] }
        }, 'drone')

    def checkCurrentLocation(self):
        current_gps=self.vehicle.location.global_relative_frame
        current = {
            "lon": current_gps.lon,
            "lat": current_gps.lat,
            "alt": current_gps.alt
        }
        return current

    def calculateTime(self, speed, distance):
        left = round(((distance / speed) * 60) / 3600)
        if(left < 1):
            left = 1
        return left
    
    def controlServo(self, onoff):
        if(onoff):
            onoff = 2000
        else:
            onoff = 1000
        msg = self.vehicle.message_factory.command_long_encode(
            0, 0,   
            mavutil.mavlink.MAV_CMD_DO_SET_SERVO, 
            0, 
            10,    
            onoff,          
            0, 0, 0, 0, 0)    
        self.vehicle.send_mavlink(msg)

def connectDrone():
    return connect(connection, wait_ready=True, baud=57600)

def listenCallback(topic, payload):
    global drone
    global location_point
    global received_all_event
    data = json.loads(payload)
    if(data['status'] == 'ready'):
        location_point = data.copy()
        drone.setUserId(data['user_id'])

        print('PICKING DELIVERY')
        drone.controlServo(True)
        time.sleep(1)

        if(drone.armCheck()):
            drone.takeOffAlitude(3, 1.1)
        else:
            print('드론 상태를 점검 후 다시 실행해 주세요!') 
    if(data['status'] == 'complete' or data['status'] == 'cancel'):
        print('status completed')
        received_all_event.set()

drone = Drone(connectDrone(), 'ICT-01')

command_check = False
start_time = 0
location_point = dict()

pipeline, fig = cam.settings()

current_id = drone.getId()
print(f'{current_id}')

cloud_connect.listenMessage('delivery/request', listenCallback)

##### 드론 목적지까지 이동

while True:
    if(command_check):
        point1 = LocationGlobalRelative(location_point["end"]["lat"], location_point["end"]["lon"], 1.1)
        convert_point = {
            'lon': int((point1.lon + 180) * 1000000),
            'lat': int((point1.lat + 90) * 1000000),
            'alt': point1.alt
        }
        point1_int = LocationGlobalRelative(37, 127, 1)

        current_location = drone.vehicle.location.global_relative_frame

        total_distance = drone.getDistanceMetres(point1, current_location)
        drone.setTotalDistance(total_distance)


        print(current_location)
        print(point1)

        cam.oneCheck(pipeline, fig, drone, convert_point, point1, cloud_connect, current_id, 0)
        break
    time.sleep(1)


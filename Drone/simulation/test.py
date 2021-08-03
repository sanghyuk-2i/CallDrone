# 2021년 한이음 프로젝트
# 프로젝트명 : 콜드론
# 팀명 : 인터셉터
# 마지막 수정일 : 2021-07-10

# 코드 참고 링크(Thanks to)
# DroneKit Offical Documents : https://dronekit-python.readthedocs.io/en/latest/about/index.html

# 기능 설명
# 1. 드론이 한 지점(현재 위치)에서 앞, 뒤, 좌, 우 테스트               ----- 개발 완료
# 2. 드론이 한 지점(현재 위치)에서 다른 위치(목적지)로 이동             ----- 개발 완료
# 3. 드론의 상태 Log들을 클라우드로 전송                            ----- 개발 예정


from __future__ import print_function
from dronekit import connect, VehicleMode, LocationGlobalRelative
from pymavlink import mavutil

import sys, os
import time
import uuid
import asyncio
import json
import math

##### Connect to AWS IoT Core
##### 연결 전, 인증경로(.env)가 올바르게 설정되었는지 확인할 것!!

sys.path.append('../../Cloud')
import cloud_iot

# cloud_connect = cloud_iot.Connection()

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
    
    def armCheck(self):
        check_timeout = time.time()

        while(check_timeout - time.time() < 15):
            while not self.vehicle.is_armable:
                print(f'{self.drone_id} : 드론 기본 상태 확인 중...')
                time.sleep(1)
            
            self.vehicle.mode = VehicleMode("GUIDED")
            self.vehicle.armed = True

            while not self.vehicle.armed:
                print(f'드론 모터 실행하라고 전송 중...')
                time.sleep(1)
            
            return True
        print('지연 초과로 드론을 작동시키지 못했습니다.')
        return False
    
    def takeOffAlitude(self, air_speed, set_alt):
        self.vehicle.airspeed = air_speed
        
        print('드론 이륙!!!')
        self.vehicle.simple_takeoff(set_alt)

        while True:
            drone_alt = self.vehicle.location.global_relative_frame.alt
            print(f'현재 고도 : {drone_alt}')
            if(drone_alt >= set_alt * 0.95):
                print(f'목표 고도에 도달 : {set_alt}')
                break
            time.sleep(1)
    
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
        return result

    def landingAndShutdown(self):
        print("드론 착륙!!!")
        self.vehicle.mode = VehicleMode("LAND")

        self.vehicle.armed = False
        self.vehicle.close()

    def droneStatusLog(self, current=None):
        log = {
            "GPS": str(self.vehicle.gps_0),
            "Battery": self.checkBattery(self.vehicle.battery),
            "Heartbeat": str(self.vehicle.last_heartbeat),
            "Mode": str(self.vehicle.mode.name),
            "System Status": str(self.vehicle.system_status.state),
            "Armable": self.vehicle.is_armable,
            "Current Location": self.checkCurrentLocation(current)
        }
        return json.dumps(log)

    def checkBattery(self, battery):
        result = {
            "voltage": battery.voltage,
            "current": battery.current,
            "level": battery.level
        }
        return result 

    def checkCurrentLocation(self, current_gps):
        if current_gps is None:
            return None
        current = {
            "lon": current_gps.lon,
            "lat": current_gps.lat,
            "alt": current_gps.alt
        }
        return current

async def connectDrone():
        return connect(connection, wait_ready=True)


loop = asyncio.get_event_loop()
drone = Drone(loop.run_until_complete(connectDrone()), 'ICT-01')

current_id = drone.getId()
print(f'{current_id}')
time.sleep(10)


if(drone.armCheck()):
    drone.takeOffAlitude(3, 1.0)
    # cloud_connect.sendMessage(current_id, drone.droneStatusLog())
else:
    print('드론 상태를 점검 후 다시 실행해 주세요!')


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

# point1 = LocationGlobalRelative(37.27680531, 127.12929642, 0.1)
# drone.vehicle.simple_goto(point1)

# current_location = drone.vehicle.location.global_relative_frame

# print(current_location)
# print(point1)

# while True:
#     left_distance = drone.getDistanceMetres(current_location, point1)
#     if(left_distance > 0.6):
#         print(f'남은 거리 : {left_distance}m')
#         # cloud_connect.sendMessage(current_id, drone.droneStatusLog(current_location))
#     else:
#         time.sleep(3)
#         drone.landingAndShutdown()
#         break
#     current_location = drone.vehicle.location.global_relative_frame
#     time.sleep(1)




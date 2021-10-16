from os import pipe
from numpy.lib.function_base import append
import pyrealsense2.pyrealsense2 as rs
import numpy as np
import pandas as pd
import cv2

#import matplotlib.cm as cm
import matplotlib.pyplot as plt
#import seaborn as sns
#import scipy.stats as stats

from tensorflow.keras.preprocessing import image

import time
import math

from PIL import Image

# from pycoral.utils.dataset import read_label_file
# from pycoral.utils.edgetpu import make_interpreter
# from pycoral.adapters import common
# from pycoral.adapters import detect

# MODEL_PATH = './mobiledet/ssdlite_mobiledet_coco_qat_postprocess_edgetpu.tflite'
# LABEL_PATH = './mobiledet/coco_lables.txt'
CAM_W = 640
CAM_H = 480
SCORE_THRESHOLD = 0.7
COUNT_DEFAULT = 5

left_cnt=  0
middle_cnt = 0
right_cnt= 0
dangerous_cnt= 0 

def draw_objects(color_image, depth_image, depth_frame, objs, labels, verts):
    draw_zone(depth_image)

    # min_dist = 999
    for obj in objs:
        bbox = obj.bbox
        p1 = [int(bbox.xmin), int(bbox.ymin)]
        p2 = [int(bbox.xmax), int(bbox.ymax)]

        p1[0] = 0 if p1[0] < 0 else p1[0]
        p1[1] = 0 if p1[1] < 0 else p1[1]

        p2[0] = 639 if p2[0] >= 640 else p2[0]
        p2[1] = 479 if p2[1] >= 480 else p2[1]

        middle_point = [(p1[0] + p2[0]) // 2, (p1[1] + p2[1]) // 2]
        distance = depth_frame.get_distance(middle_point[0], middle_point[1])
        # if(distance < min_dist):
        #     min_dist = distance
        #     min_obj_label = labels.get(obj.id, obj.id)

        cv2.rectangle(depth_image, (p1[0], p1[1]),
                      (p2[0], p2[1]), (255, 0, 255), 2, 1)
        cv2.putText(depth_image, '%s\n %.2f' % (labels.get(obj.id, obj.id), distance),
                    (bbox.xmin + 10, bbox.ymin + 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)


def calcAzimuth(f_src_lat, f_src_lon, f_dst_lat, f_dst_lon):
    PI = math.pi

    pi1 = f_src_lat * PI/180
    pi2 = f_dst_lat * PI/180

    lambda1 = f_src_lon * PI/180
    lambda2 = f_dst_lon * PI/180

    y = math.sin(lambda2 - lambda1) * math.cos(pi2)
    x = math.cos(pi1) * math.sin(pi2) - math.sin(pi1) * \
        math.cos(pi2) * math.cos(lambda2 - lambda1)
    theta = math.atan2(y, x)
    bearing = (theta * 180 / PI + 360) % 360
    return theta, bearing

def get_bearing(aLocation1, aLocation2):	
    off_x = aLocation2.lon - aLocation1.lon
    off_y = aLocation2.lat - aLocation1.lat
    bearing = 90.00 + math.atan2(-off_y, off_x) * 57.2957795
    if bearing < 0:
        bearing += 360.00
    return bearing

# def select_red_zone(image,frame,verts):
#     # 0.5 ~ 1.0m : STOP
#     # 1.0 ~ 1.5m : NEED ROTATE
#     # 1.5m ~  : STRAIGHT
#     mid_y = 240
#     y_gap = 1
#     left_x = 0
#     right_x= 640
#     mix_x = (left_x + right_x) / 2
#     lidar_line = verts[mid_y:mid_y+y_gap , left_x:right_x].reshape(-1,3)
#     zs = lidar_line[:,2]

#     theta,bearing = calcAzimuth(0,0,1,1)
#     # from mid_x to (right_x - 10)
#     # 0~ 40 degree

#     # more degree , (right_x -10) ~ right_x

#     bearing_dir = (bearing > 180)
#     bearing_ang = (bearing % 180)

#     inner_ang_red_zone = bearing_ang % 40

def check_depth_filter(i):
    result = 0
    if(i > 0.1 and i <= 0.5):
        result = 1
    elif(i > 0.5 and i <= 1.5):
        result = 2
    elif(i > 1.5):
        result = 3
    return result


def check_depth_filter_x(i):
    result = 0
    if(i >= 0 and i <= 0.5):
        result = 1
    else:
        result = 2
    return result

def getMostPopular(li):
    
    count= []
    delimeter = 10
    nCut = 10
    for i in range(delimeter * nCut):
        count.append(0)

    for i in range(len(li)):
        meter = li[i]
        if meter >= 10 :
            meter = 9.9
        if meter < 0 :
            continue 
        count[int(meter*nCut)] += 1

    biggest = 0
    biggestVal = -1

    for i in range(delimeter * nCut):
        if biggest < count[i]:
            biggest = count[i]
            biggestVal = i

    return biggestVal/ nCut


def filter_red_zone(image, frame, verts, fig, drone, point, bearing):
    result = 0

    global left_cnt
    global middle_cnt
    global right_cnt
    global dangerous_cnt

    one_line = verts[CAM_H // 2:CAM_H // 2 + 1, 0:CAM_W].reshape(-1, 3)
    zs = one_line[:, 2]
    xs = one_line[:, 0]

    change_to_angle = [arr.mean() for arr in zs.reshape(-1, 4)]
    area_half = len(change_to_angle) // 2

    angle_right = change_to_angle[0:area_half-10]
    angle_middle = change_to_angle[area_half-10:area_half+10]
    angle_left = change_to_angle[area_half+10:len(change_to_angle)]


    angle_left.sort()
    angle_middle.sort()
    angle_right.sort()

    angle_left = pd.Series(angle_left)
    angle_left.drop(angle_left[angle_left==0].index,inplace=True)
    angle_middle = pd.Series(angle_middle)
    angle_middle.drop(angle_middle[angle_middle==0].index,inplace=True)
    angle_right = pd.Series(angle_right)
    angle_right.drop(angle_right[angle_right==0].index,inplace=True)

    angle_left = angle_left.values
    angle_middle = angle_middle.values
    angle_right = angle_right.values

    print(f'angle_left : {angle_left}')
    print(f'angle_middle : {angle_middle}')
    print(f'angle_right : {angle_right}')

    div_num = 5 
    
    left_depth = getMostPopular(angle_left)
    right_depth = getMostPopular(angle_right)
    middle_depth = getMostPopular(angle_middle)

    dangerous_left = sum(angle_left[div_num:div_num*2])/div_num
    dangerous_right = sum(angle_right[div_num:div_num*2])/div_num
    dangerous_middle = sum(angle_middle[div_num:div_num*2])/div_num

    print('--------------------------------------Before revision--------------------------------------------------')
    print('left depth : '+str(left_depth) + ' , '+'middle depth :'+ str(middle_depth) + ' , '+'right depth : '+ str(right_depth))
    print('======================================================================================================')
    dir_weight = 1.1
    threshold = 1.0

    # bearing %= 180
    # if bearing <= 55 :
    #     if left_depth > threshold :
    #         left_depth *= dir_weight
    # elif bearing <= 125:
    #     if middle_depth > threshold :
    #         middle_depth *= dir_weight * 1.2
    # else :
    #     if right_depth > threshold :
    #         right_depth *= dir_weight
    
    # if middle_depth > threshold:
    #     middle_depth*= 1.2

    print('--------------------------------------After revision--------------------------------------------------')
    print('left depth : '+str(left_depth) + ' , '+'middle depth :'+ str(middle_depth) + ' , '+'right depth : '+ str(right_depth))
    print('======================================================================================================')

    li = []
    li_data = [[left_depth, dangerous_left], [right_depth, dangerous_right], [middle_depth, dangerous_middle]]

    for i, data in enumerate(li_data):
        li.append([i, round(data[0], 1), round(data[1], 1)])

    print('======================================================================================================')
    print(f'Before li : {li}')
    li.sort(key =lambda x: (-x[2], -x[1], -x[0]))
    print(f'After li : {li}')
    if li[0][2] == li[1][2]:
        dangerous_cnt+=1

    first = li[0]
    if first[0] == 0 :
        left_cnt+=1
    elif first[0] == 1:
        right_cnt+=1
    else:
        middle_cnt+=1

    print('first: ', first)
    print('======================================================================================================')
    if first[1] < threshold:
        result = 3
    else:
        result = first[0]
        
    # cv2.putText(image, '%d' % dangerous_cnt, (319, 190),
    #             cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)   

    # cv2.putText(image, '%d  %d  %d' % (left_cnt, middle_cnt, right_cnt), (319, 210),
    #             cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)   

    # cv2.putText(image, '%.2f %.2f %.2f' % (left_depth, middle_depth, right_depth), (319, 235),
    #             cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)   

    x, y, z =  0, 0, 0
    if(result == 0):
        print('LEFT') 
        x, y, z = 0, -1, 0
    elif(result == 1):
        print('RIGHT')
        x, y, z = 0, 1, 0
    elif(result == 2):
        print('STRAIGHT') 
        drone.condition_yaw(bearing)
        x, y, z = 1, 0, 0
    else:
        print('STOP')
        x, y, z = 0, 0, 0

    print('======================================================================================================')

    drone.set_velocity_body(x, y, z)

    # ======================= Range middle line's depth and visualize with using matplotlib =======================

    # theta = np.linspace(0.0, np.pi, 160)
    # width = np.pi / 180
    # colors = plt.cm.viridis(change_to_angle)

    # ax = plt.subplot(projection='polar')
    # ax.set_ylim([0,4])
    # bars = ax.bar(theta, change_to_angle, width=width, bottom=0.0, color=colors, alpha=0.5)

    # ax.set_thetamin(10)
    # ax.set_thetamax(170)

    # filter_depth = np.array([check_depth_filter(i) for i in zs])
    # filter_x = np.array([check_depth_filter_x(i) for i in xs])

    # theta, bearing = calcAzimuth(0,0,1,1)

    # bearing_dir = (bearing > 180)
    # bearing_ang = (bearing % 180)

    # inner_ang_red_zone = bearing_ang % 40

    # print(bearing)
    # print(bearing_ang)
    # print(inner_ang_red_zone)

    # for i in range(0, CAM_W):
    #     if(filter_depth[i] == 1):
    #         cv2.circle(image, (i, 240), radius=1,
    #                    color=(0, 0, 255), thickness=3)
    #     elif(filter_depth[i] == 2):
    #         cv2.circle(image, (i, 240), radius=1,
    #                    color=(0, 255, 255), thickness=3)
    #     else:
    #         cv2.circle(image, (i, 240), radius=1,
    #                    color=(0, 255, 0), thickness=3)
    
    # return result


def detection_mode(image, frame, verts):
    one_line = verts[240:241, 0:640].reshape(-1, 3)
    zs = one_line[:, 2]

    std_mean = np.std(zs)

    cv2.putText(image, '%.2f' % (std_mean), (10, 40),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
    depth_data, depth_location = list(), list()
    start_p, end_p = 0, 0
    check_long, check_mean = 0, 0
    count, longest = 0, 0
    # for i in range(0, len(zs)):
    while(count < len(zs)):
        if(start_p == 0 and count == 0):
            start_p = 0
        else:
            start_p = count

        while(zs[count] > std_mean and zs[count]):
            count += 1
            check_long += 1
            check_mean += zs[count]
        if(check_long > 0):
            # depth_location.append([start_p, end_p])
            depth_mean = check_mean / check_long
            depth_data.append(
                [round(check_long * depth_mean, 2), check_long, start_p, count])
        start_p, end_p = 0, count
        # if(check_long > longest):
        #     longest = check_long
        #     start_p, end_p = 0, i
        count += 1
        check_long = 0
    if(len(depth_data) == 0):
        depth_data.append([0, 0, 0, 0])

    sort_depth = sorted(depth_data, key=lambda x: x[0], reverse=True)
    print(sort_depth)

    for i in range(sort_depth[0][2], sort_depth[0][3]):
        cv2.circle(image, (i, 240), radius=1, color=(0, 0, 255), thickness=3)
    cv2.putText(image, '%d' % (sort_depth[0][1]), ((
        sort_depth[0][2] + sort_depth[0][3]) // 2, 235), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)


def center_mode(image, frame, verts):
    one_line = verts[240:241, 0:640].reshape(-1, 3)
    point = one_line[319:320, 2]

    cv2.circle(image, (319, 240), radius=1, color=(0, 0, 255), thickness=3)
    cv2.putText(image, '%.2f' % (point), (319, 235),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)


def draw_zone(image):
    cv2.rectangle(image, (0, 280), (640, 281), (100, 100, 100), 1, 1)

def settings():
    pipeline = rs.pipeline()
    config = rs.config()
    config.enable_stream(rs.stream.depth, CAM_W, CAM_H, rs.format.z16, 30)
    config.enable_stream(rs.stream.color, CAM_W, CAM_H, rs.format.bgr8, 30)

    profile = pipeline.start(config)
    fig = plt.figure()

    return pipeline, fig


def oneCheck(pipeline, fig, drone, point_int, target, cloud_connect, current_id, i=0):
    end_check = False

    while True:
        current_location = drone.vehicle.location.global_relative_frame
        left_distance = drone.getDistanceMetres(current_location, target)
        bearing = get_bearing(current_location, target)
        if(left_distance > 0.6):
            print(f'남은 거리 : {left_distance}m')
            if(i % 5 == 0):
                drone.sendCurrentLog(cloud_connect, left_distance, None)
        else:
            time.sleep(3)
            end_check = True
            break
        i += 1
        print(i)
        
        aligned_stream = rs.align(rs.stream.color)
        point_cloud = rs.pointcloud()

        frames = pipeline.wait_for_frames()
        frames = aligned_stream.process(frames)
        depth_frame = frames.get_depth_frame()
        color_frame = frames.get_color_frame()

        points = point_cloud.calculate(depth_frame)
        verts = np.asanyarray(points.get_vertices()).view(
        np.float32).reshape(-1, CAM_W, 3)  # xyz

        depth_image = np.asanyarray(depth_frame.get_data())
        color_image = np.asanyarray(color_frame.get_data())

        depth_colormap = cv2.applyColorMap(cv2.convertScaleAbs(
        depth_image, alpha=0.03), cv2.COLORMAP_JET)

        img_pil = Image.fromarray(color_image)

        # ========================= CORAL PART =========================

        # labels = read_label_file(LABEL_PATH)
        # interpreter = make_interpreter(MODEL_PATH)
        # interpreter.allocate_tensors()

        # _, scale = common.set_resized_input(interpreter, img_pil.size, lambda size: img_pil.resize(size, Image.ANTIALIAS))

        # print('----INFERENCE TIME----')
        # print('Note: The first inference is slow because it includes','loading the model into Edge TPU memory.')
        # for _ in range(COUNT_DEFAULT):
        #     start = time.perf_counter()
        #     interpreter.invoke()
        #     inference_time = time.perf_counter() - start
        #     objs = detect.get_objects(interpreter, SCORE_THRESHOLD, scale)
        #     print('%.2f ms' % (inference_time * 1000))

        # print('-------RESULTS--------')
        # if not objs:
        #     print('No objects detected')

        # for obj in objs:
        #     print(labels.get(obj.id, obj.id))
        #     print('  id:    ', obj.id)
        #     print('  score: ', obj.score)
        #     print('  bbox:  ', obj.bbox)

        # ========================= CONSIDERING DRONE MOVING WITH DEPTH PART =========================

        filter_red_zone(depth_colormap, depth_frame, verts, fig, drone, target, bearing)
        
        # ========================= DEPTH REAL-TIME VIDEO PART =========================

        # depth_colormap_dim = depth_colormap.shape
        # color_colormap_dim = color_image.shape

        # if depth_colormap_dim != color_colormap_dim:
        #     resized_color_image = cv2.resize(color_image, dsize=(depth_colormap_dim[1], depth_colormap_dim[0]), interpolation=cv2.INTER_AREA)
        #     images = np.hstack((resized_color_image, depth_colormap))
        # else:
        #     images = np.hstack((color_image, depth_colormap))

        # cv2.namedWindow('RealSense', cv2.WINDOW_AUTOSIZE)
        # cv2.imshow('RealSense', images)
        # cv2.waitKey(1)

    print('ARRIVE DESTINATION!')
    drone.landingAndShutdown()

    

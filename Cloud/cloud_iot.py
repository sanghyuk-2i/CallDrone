from awscrt import io, mqtt, auth, http
from awsiot import mqtt_connection_builder
from dotenv import load_dotenv

import os
import json
import time
import threading

class Connection:
    received_count = 0
    received_all_event = threading.Event()

    def __init__(self):
        load_dotenv(verbose=True)

        event_loop_group = io.EventLoopGroup(1)
        host_resolver = io.DefaultHostResolver(event_loop_group)
        self.mqtt_connection = mqtt_connection_builder.mtls_from_path(
            endpoint=os.getenv('ENDPOINT'),
            cert_filepath=os.getenv('CERT_FILEPATH'),
            pri_key_filepath=os.getenv('PRI_KEY_FILEPATH'),
            ca_filepath=os.getenv('CA_FILEPATH'),
            client_bootstrap=io.ClientBootstrap(event_loop_group, host_resolver),
            client_id=os.getenv('CLIENT_ID'),
            clean_session=False,
            keep_alive_secs=6
        )



        connect_future = self.mqtt_connection.connect()
        
        connect_future.result()
        print("Connected!")
    
    def sendMessage(self, message, topic):
        self.mqtt_connection.publish(
            topic,
            # topic=str(drone_id) + '/log/',
            payload=json.dumps(message),
            qos=mqtt.QoS.AT_LEAST_ONCE
        )
    
    def listenMessage(self, topic, recieve):
        subscribe_future, packet_id = self.mqtt_connection.subscribe(
            topic,
            qos=mqtt.QoS.AT_LEAST_ONCE,
            callback=recieve
        )
        # subscribe_result = subscribe_future.result()
        subscribe_result = subscribe_future.result()
    
    # def on_message_received(self, topic, payload):
    #     # print("Received message from topic '{}': {}".format(topic, payload))
    #     data = json.loads(payload)
    #     if(data['status'] == 'complete' or data['status'] == 'cancel'):
    #         self.received_all_event.set()
    #     return data
    #     # self.received_count += 1
        # if self.received_count == 10:
            # self.received_all_event.set()

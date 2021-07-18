from awscrt import io, mqtt, auth, http
from awsiot import mqtt_connection_builder
from dotenv import load_dotenv

import os
import json
import time

class Connection:
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


        # Make the connect() call
        connect_future = self.mqtt_connection.connect()
        # Future.result() waits until a result is available
        connect_future.result()
        print("Connected!")
    
    def sendMessage(self, drone_id, message):
        self.mqtt_connection.publish(
            topic='iot/topic',
            # topic=str(drone_id) + '/log/',
            payload=message,
            qos=mqtt.QoS.AT_LEAST_ONCE
        )
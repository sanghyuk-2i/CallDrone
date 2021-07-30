import React from 'react';
import AWS from 'aws-sdk';
import awsIot from 'aws-iot-device-sdk';
import { REGION, INDENTITYPOOL_ID, IOT_HOST } from '@env';

export default class Iotcore {
    constructor() {
        this.auth()
    }

    auth() {
        AWS.config.region = REGION;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: INDENTITYPOOL_ID,
        });

        AWS.config.credentials.get(function () {
            let accessKeyId = AWS.config.credentials.accessKeyId;
            let secretKey = AWS.config.credentials.secretAccessKey;
            let sessionToken = AWS.config.credentials.sessionToken;
        });
    }

    connect() {
        this.device = awsIot.device({
            host: IOT_HOST,
            clientId: 'webapp:' + new Date().getTime(),
            protocol: 'wss',
            accessKeyId: AWS.config.credentials.accessKeyId,
            secretKey: AWS.config.credentials.secretAccessKey,
            sessionToken: AWS.config.credentials.sessionToken,
        });

        this.device.on('connect', function () {
            console.log('Cloud has been connected!');
        });
    }

    listen(topic, setState) {
        this.device.subscribe(topic);
        this.device.on('message', function (topic, payload) {
            let check = JSON.parse(payload);
            setState(check);
            // console.log('message', topic, payload.toString());
        });
    }

    send(topic, data) {
        console.log('send!!', data);
        this.device.publish(topic, JSON.stringify(data));
    }

    check() {
        console.log('Test!')
    }
}
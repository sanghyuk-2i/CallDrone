import AWS from 'aws-sdk';
import awsIot from 'aws-iot-device-sdk';
import { REGION, INDENTITYPOOL_ID, IOT_HOST } from '@env';

export default class Iotcore {
    constructor() {
        this.auth()
        // setTimeout(() => {
        //     this.connect()
        // }, 600)
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

    offline() {
        this.device.on('offline', function () {
            console.log('offline');
        });
    }

    disconnect() {
        console.log('disconnect');
        this.device.end()
    }

    listen(topic, callback) {
        console.log('listen on!');
        this.device.subscribe(topic)
        this.device.on('message', function (topic, payload) {
            console.log('message came!');
            let check = JSON.parse(payload);
            // setState((prevState) => ({ ...prevState, ...check }))
            callback(check);
        });

    }

    send(topic, data) {
        console.log('send!!', data);
        this.device.publish(topic, JSON.stringify(data));
    }

    subscribe(topic) {
        this.device.subscribe(topic);
    }

    check() {
        console.log('Test!')
    }
}

// export default function onRun() {
//     const [current, setCurrent] = useState()
//     const Iot = new Iotcore();

//     useEffect(() => {
//         setTimeout(() => {
//             Iot.listen('delivery/response', function (payload) {
//                 setCurrent({ ...payload })
//             })
//         }, 800)
//         return () => {
//             Iot.disconnect();
//         }
//     })

//     console.log("i'm listening");

//     return (
//         <>
//         </>
//     )
// }
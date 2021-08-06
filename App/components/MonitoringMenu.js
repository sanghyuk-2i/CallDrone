import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Dimensions, Animated, PanResponder } from 'react-native'
import Back from './common/Back';
import { WEATHER_API_KEY } from '@env';

import MonitoringDetailMenu from './MonitoringDetailMenu';

export default function MonitoringMenu({ route, navigation }) {


    const [drone, setDrone] = useState({
        id: "none",
        model: "none",
        status: "OFF",
        altitude: 0,
        battery: 0,
        temperature: 0,
        gps: false,
        connection: false,
        speed: 0,
        rotation: 0,
        location: { lat: 0, lon: 0 }
    });

    // Weather API (OpenWeather)
    // Weather Icon = http://openweathermap.org/img/wn/{icon.id}@2x.png

    const [weather, setWeather] = useState({
        status: '',
        temp: 0,
        wind: 0,
        icon: ''
    })

    const { Iot, using } = route.params;

    const [back, setBack] = useState(true);

    useEffect(() => {
        if (using) {
            Iot.connect();
            setTimeout(() => {
                Iot.listen('drone', function (payload) {
                    checkDrone(payload);
                })
            }, 600)
        }
        return () => {
            Iot.disconnect();
        }
    }, [using])

    const checkDrone = (payload) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${payload.location.lat}&lon=${payload.location.lon}&APPID=${WEATHER_API_KEY}&units=metric`)
            .then((res) => { return res.json() })
            .then((json) => {
                console.log(json);
                setWeather((prevWeather) => ({ ...prevWeather, status: json.weather[0].main, temp: json.main.temp, wind: json.wind.speed, icon: json.weather[0].icon }))
            });
        setDrone({ ...payload });
    }

    const slideRef = useRef();

    const showSlide = () => {
        setBack(!back);
        slideRef.current.slideUp();
    }

    return (
        <>
            <StatusBar style={'auto'} />
            <View style={styles.container}>
                {
                    back ? <Back navigation={navigation} /> : null
                }
                <View style={styles.HeaderWrapper}>
                    <View style={styles.HeaderSeries}>
                        <Text style={styles.HeaderSeriesText}>{drone.model}</Text>
                    </View>
                    <View style={styles.HeaderId}>
                        <Text style={styles.HeaderIdText}>{drone.id}</Text>
                    </View>
                    <Image
                        style={styles.HeaderImageIcon}
                        source={require('../assets/drone2.png')}
                        resizeMode={'cover'} />
                </View>
                <View style={styles.DetailWrapper}>
                    <View style={styles.simpleContainer}>
                        <View style={[styles.simpleIcon, { backgroundColor: (drone.status !== 'OFF') ? 'green' : 'red' }]}></View>
                        <Text style={styles.simpleText}>{drone.status}</Text>
                    </View>
                    <View style={styles.simpleContainer}>
                        <View style={[styles.simpleIcon, { backgroundColor: (drone.connection) ? 'green' : 'red' }]}></View>
                        <Text style={styles.simpleText}>{(drone.connection) ? "Connect" : "Disconnect"}</Text>
                    </View>
                </View>
                <View style={styles.DetailClick}>
                    <TouchableOpacity onPress={() => showSlide()}><Text style={styles.DetailClickText}>세부사항</Text></TouchableOpacity>
                </View>
            </View>
            <MonitoringDetailMenu back={setBack} ref={slideRef} drone={drone} weather={weather} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex'
    },
    HeaderWrapper: {
        marginTop: 100,
        alignSelf: "center",
    },
    HeaderSeries: {
        alignSelf: "center",
    },
    HeaderSeriesText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'black',
    },
    HeaderId: {
        alignSelf: "center",
    },
    HeaderIdText: {
        fontSize: 48,
        fontWeight: '700',
        color: 'black',
    },
    HeaderImageIcon: {
        width: 300,
        height: 300,
        marginVertical: 36,
    },
    DetailWrapper: {
        alignSelf: "center",
    },
    simpleContainer: {
        flexDirection: "row",
        marginVertical: 14
    },
    simpleIcon: {
        width: 30,
        height: 30,
        backgroundColor: 'black',
        borderRadius: 50,
        alignSelf: 'center'
    },
    simpleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginHorizontal: 36,
        alignSelf: 'center',
    },
    DetailClick: {
        alignSelf: "center",
        marginVertical: 14
    },
    DetailClickText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'gray',
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
    },
});



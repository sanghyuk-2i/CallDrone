import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Dimensions, Animated, PanResponder } from 'react-native'
import Back from './common/Back';

import MonitoringDetailMenu from './MonitoringDetailMenu';

export default function MonitoringMenu({ route, navigation }) {


    const check = {
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
        location: { lattitude: 0, longtitude: 0 }
    }

    const [drone, setDrone] = useState(check);

    const { Iot } = route.params;
    Iot.listen('drone', setDrone);

    const [back, setBack] = useState(true);

    const slideRef = useRef();

    const showSlide = () => {
        setBack(!back);
        slideRef.current.slideUp();
    }

    const viewStatement = []
    const colorChange = (status) => {
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
            <MonitoringDetailMenu back={setBack} ref={slideRef} drone={drone} />
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



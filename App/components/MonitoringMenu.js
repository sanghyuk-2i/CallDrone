import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Dimensions, Animated, PanResponder } from 'react-native'
import Back from './common/Back';

import MonitoringDetailMenu from './MonitoringDetailMenu';

export default function MonitoringMenu({ navigation }) {

    const [back, setBack] = useState(true);
    const [status, setStatus] = useState({
        color: ['red', 'red'],
        text: ['OFF', 'Disconnect']
    });

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
                        <Text style={styles.HeaderSeriesText}>Drone Series 1</Text>
                    </View>
                    <View style={styles.HeaderId}>
                        <Text style={styles.HeaderIdText}>#ID12345</Text>
                    </View>
                    <Image
                        style={styles.HeaderImageIcon}
                        source={require('../assets/drone2.png')}
                        resizeMode={'cover'} />
                </View>
                <View style={styles.DetailWrapper}>
                    {
                        [...Array(2)].map((v, i) =>
                            <View style={styles.simpleContainer} key={i}>
                                <View style={[styles.simpleIcon, { backgroundColor: status.color[i] }]}></View>
                                <Text style={styles.simpleText}>{status.text[i]}</Text>
                            </View>
                        )
                    }
                </View>
                <View style={styles.DetailClick}>
                    <TouchableOpacity onPress={() => showSlide()}><Text style={styles.DetailClickText}>세부사항</Text></TouchableOpacity>
                </View>
            </View>
            <MonitoringDetailMenu back={setBack} ref={slideRef} />
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



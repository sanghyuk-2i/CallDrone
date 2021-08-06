import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity, Image, TextInput, PanResponder } from 'react-native';

const MonitoringDetailMenu = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        slideUp() {
            Animated.timing(pan.y, {
                toValue: LIMIT_HEIGHT,
                duration: 500,
                useNativeDriver: false
            }).start();
        }
    }));

    // IoT Data

    const { drone, weather } = props;
    const checkIot = {
        dataOne: [drone.altitude + 'M', drone.battery + '%', drone.temperature + '℃'],
        dataTwo: [[drone.gps, drone.connection], [drone.speed, drone.rotation]]
    }

    const changeStatus = (check) => {
        return (check) ? 'ON' : 'OFF';
    }

    // View Data

    const LIMIT_HEIGHT = 200;

    const viewData = {
        iconOne: [require('../assets/icon/detail/terrain.png'), require('../assets/icon/detail/battery.png'), require('../assets/icon/detail/thermostat.png')],
        iconTwo: [[require('../assets/icon/detail/gps.png'), require('../assets/icon/detail/signal.png')], [require('../assets/icon/detail/windy.png'), require('../assets/icon/detail/rotation.png')]],
        textOne: ['고도', '배터리', '온도'],
        textTwo: [['GPS', '연결'], ['비행 속도', '회전']],
        textThree: ['℃', 'm/s']
    }

    const deviceHeight = Dimensions.get('window').height;
    const pan = useRef(new Animated.ValueXY({ x: 0, y: deviceHeight })).current;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponderCapture: () => true,
        onPanResponderMove: (e, gesture) => {
            if (gesture.moveY >= LIMIT_HEIGHT) {
                pan.setValue({ x: 0, y: gesture.moveY })
            }
        },
        onPanResponderRelease: (e, gesture) => {
            let num = 0;
            (gesture.moveY >= deviceHeight - LIMIT_HEIGHT * 2) ? (props.back(true), num = deviceHeight) : num = LIMIT_HEIGHT
            Animated.spring(
                pan,
                { toValue: { x: 0, y: num }, useNativeDriver: false },
            ).start();
        },
    });

    return (
        <Animated.View style={[styles.menu, pan.getLayout()]}>
            <Animated.View {...panResponder.panHandlers} style={styles.viewDrawer}>
                <View style={styles.drawer}></View>
            </Animated.View>
            <View style={styles.viewDetail}>
                <Text style={styles.detailTitle}>세부정보</Text>
                <View style={styles.detailContainOne}>
                    {
                        viewData.textOne.map((v, i) =>
                            <View style={[styles.valueContain, { width: '33.3%' }]} key={i}>
                                <Text style={styles.valueText}>{checkIot.dataOne[i]}</Text>
                                <View style={styles.explainContain}>
                                    <Image style={styles.explainIcon} source={viewData.iconOne[i]} />
                                    <Text style={styles.explainText}>{v}</Text>
                                </View>
                            </View>
                        )
                    }
                </View>
                <View style={styles.detailContainTwo}>
                    {
                        viewData.textTwo.map((text, i) =>
                            <View style={styles.detailSubContain} key={i}>
                                {
                                    viewData.iconTwo.map((icon, j) =>
                                        <View style={[styles.valueContain, { width: '50%' }]} key={j}>
                                            <Text style={styles.valueText}>{(i == 0) ? changeStatus(checkIot.dataTwo[i][j]) : checkIot.dataTwo[i][j]}</Text>
                                            <View style={styles.explainContain}>
                                                <Image style={styles.explainIcon} source={viewData.iconTwo[i][j]} />
                                                <Text style={styles.explainText}>{viewData.textTwo[i][j]}</Text>
                                            </View>
                                        </View>
                                    )
                                }
                            </View>
                        )
                    }
                </View>
            </View>
            <View style={styles.viewWeather}>
                <Text style={styles.weatherTitle}>현재 지역 날씨</Text>
                <View style={styles.weatherContainer}>
                    <Image style={styles.weatherIcon} source={{ uri: `http://openweathermap.org/img/wn/${weather.icon}@2x.png` }} resizeMode={'contain'} />
                    {
                        viewData.textThree.map((v, i) =>
                            <View style={styles.weatherBox} key={i}>
                                <Text style={styles.weatherValue}>{(i === 0) ? weather.temp : weather.wind}</Text>
                                <Text style={styles.weatherText}>{v}</Text>
                            </View>
                        )
                    }
                </View>
            </View>
        </Animated.View>
    )
});

const styles = StyleSheet.create({
    menu: {
        display: 'flex',
        position: 'absolute',
        backgroundColor: 'white',
        width: '100%',
        height: '80%',
        alignItems: 'center',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        zIndex: 99
    },
    viewDrawer: {
        width: '100%',
        height: 40
    },
    drawer: {
        width: 48,
        height: 5,
        backgroundColor: '#E8E8E8',
        borderRadius: 100,
        marginVertical: 14,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    viewDetail: {
        width: '90%',
        marginBottom: 12
    },
    detailTitle: {
        fontSize: 24,
        fontWeight: '800',
        paddingVertical: 18
    },
    detailContainOne: {
        display: 'flex',
        flexDirection: 'row'
    },
    valueContain: {
        marginVertical: 12,
    },
    valueText: {
        fontSize: 28,
        fontWeight: '700',
        paddingVertical: 14,
        alignSelf: 'center'
    },
    explainContain: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    explainIcon: {
        width: 18,
        height: 18
    },
    explainText: {
        fontWeight: '600',
        alignSelf: 'center',
        paddingHorizontal: 4
    },
    detailSubContain: {
        display: 'flex',
        flexDirection: 'row'
    },

    viewWeather: {
        width: '90%',
    },
    weatherTitle: {
        fontSize: 24,
        fontWeight: '800',
        paddingVertical: 18
    },
    weatherContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    weatherIcon: {
        width: 60,
        height: 60,
    },
    weatherBox: {
        display: 'flex',
        flexDirection: 'row',
    },
    weatherValue: {
        fontSize: 36,
        fontWeight: '700',
        alignSelf: 'center'
    },
    weatherText: {
        fontSize: 18,
        fontWeight: '600',
        paddingTop: 14,
        alignSelf: 'center',
    }
});

export default MonitoringDetailMenu;



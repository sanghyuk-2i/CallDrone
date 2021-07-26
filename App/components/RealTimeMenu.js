import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity, Image, TextInput, PanResponder } from 'react-native';
import { WebView } from 'react-native-webview';
import Back from './common/Back';
import MapView from './map.html';

export default function RealTimeMenu({ route, navigation }) {

    const check = {
        start: [],
        end: [],
    }

    const { Iot } = route.params;
    const [status, setStatus] = useState(check);

    useEffect(() => {
        slideUp();
    })

    const deviceHeight = Dimensions.get('window').height;
    const pan = useRef(new Animated.ValueXY({ x: 0, y: deviceHeight })).current;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponderCapture: () => true,
        onPanResponderMove: (e, gesture) => {
            if (gesture.moveY >= deviceHeight - 330) {
                pan.setValue({ x: 0, y: gesture.moveY })
            }
        },
        onPanResponderRelease: (e, gesture) => {
            let num = 0;
            (gesture.moveY >= deviceHeight - 200) ? num = 100 : num = 340
            Animated.spring(
                pan,
                { toValue: { x: 0, y: deviceHeight - num }, useNativeDriver: false },
            ).start();
        },
    });

    const slideUp = () => {
        Animated.timing(pan.y, {
            toValue: deviceHeight - 330,
            duration: 500,
            useNativeDriver: false
        }).start();
    }

    return (
        <>
            <StatusBar style='auto' />
            <Back navigation={navigation} css={{ position: 'absolute', zIndex: 99 }} />
            <Animated.View style={[styles.menu, pan.getLayout()]} >
                <Animated.View {...panResponder.panHandlers} style={[styles.viewDrawer]}>
                    <View style={styles.drawer}></View>
                </Animated.View>
                <View style={styles.viewLocation}>
                    <View style={styles.ltnIcon}>
                        <View style={styles.circle}></View>
                        <View style={styles.straight}></View>
                        <View style={styles.circle}></View>
                    </View>
                    <View style={styles.ltnAddress}>
                        <View style={styles.addressContainer}>
                            <Text style={styles.addressText}>경기도 화성시 동탄반석로 </Text>
                        </View>
                        <View style={styles.addressContainer}>
                            <Text style={styles.addressText}>경기도 용인시 기흥구</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.viewBox}>
                    <Text style={styles.boxMinute}>50</Text>
                    <Text style={styles.boxText}>분 후 도착 예정</Text>
                </View>
                <View style={styles.viewButton}>
                    <TouchableOpacity style={styles.reqButton}><Text style={styles.btnText}>공유하기</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.reqButton}><Text style={[styles.btnText, { color: '#E96D65' }]}>배송 취소</Text></TouchableOpacity>
                </View>
            </Animated.View>
            <WebView
                style={styles.container}
                originWhitelist={['*']}
                source={MapView} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        zIndex: 1
    },
    menu: {
        display: 'flex',
        position: 'absolute',
        backgroundColor: 'white',
        width: '100%',
        height: '55%',
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
    viewLocation: {
        display: 'flex',
        height: '28%',
        flexDirection: 'row',
    },
    ltnIcon: {
        paddingRight: 14
    },
    circle: {
        borderWidth: 5,
        borderRadius: 50,
        width: 24,
        height: 24
    },
    straight: {
        width: 4,
        height: 30,
        backgroundColor: 'black',
        alignSelf: 'center',
        marginVertical: 4
    },
    ltnAddress: {
        width: '75%',
        height: '100%',
    },
    addressContainer: {
        width: '100%',
        height: '50%',
    },
    addressText: {
        width: '100%',
        paddingTop: 4,
        fontWeight: '600'
    },
    viewBox: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 12,
    },
    boxMinute: {
        fontSize: 52,
        fontWeight: '700',
        paddingRight: 18
    },
    boxText: {
        fontSize: 24,
        fontWeight: '600',
        alignSelf: 'flex-end',
        paddingBottom: 8
    },
    viewButton: {
        height: '12%',
        display: 'flex',
        flexDirection: 'row',
    },
    reqButton: {
        width: '40%',
        height: '100%',
        marginHorizontal: 6,
        backgroundColor: '#F6F6F6',
        borderRadius: 100,
        justifyContent: 'center',
    },
    btnText: {
        color: '#4B9460',
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '700'
    }
});

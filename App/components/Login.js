import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Google from 'expo-google-app-auth';
import { LOGIN_IOS, LOGIN_ANDROID } from '@env';

export default function Login({ setUser }) {

    const config = {
        iosClientId: LOGIN_IOS,
        androidClientId: LOGIN_ANDROID,
    }

    const textData = ['기존의 복잡한 택배 과정 없이,', '개인정보 유출이 가능한 송장이 필요 없이,', '원클릭으로 AI가 알아서 보내주고', '실시간 배송 추적이 가능한 앱']

    const onPress = async () => {
        const { type, accessToken, user } = await Google.logInAsync(config);

        if (type === 'success') {
            let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setUser(user);
        } else {
            Alert.alert("로그인 오류", "Google 로그인을 다시 확인해 주세요");
        }
    }

    return (
        <>
            <StatusBar style='auto' />
            <View style={styles.container}>
                <View style={styles.texts}>
                    <Text style={styles.subTitle}>바로 배송 가능한 드론 택배 서비스</Text>
                    <Text style={styles.title}>Interceptor</Text>
                    {
                        textData.map((text, index) =>
                            <Text style={styles.subText} key={index}>{text}</Text>
                        )
                    }
                </View>
                <Image style={styles.image} source={require('../assets/drone_main.png')} resizeMode={'cover'} />
                <TouchableOpacity style={styles.loginBtn} onPress={onPress}>
                    <Image style={styles.loginLogo} source={require('../assets/g-logo.png')} />
                    <Text style={styles.loginText}>Sign in with Google</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    texts: {
        marginTop: '30%',
        paddingHorizontal: 14,
    },
    subTitle: {
        fontWeight: '700',
        fontSize: 18,
    },
    title: {
        fontWeight: '800',
        fontSize: 52,
        marginVertical: 6
    },
    subText: {
        fontWeight: '500',
        fontSize: 18,
        marginVertical: 3
    },
    image: {
        width: '100%',
        height: 300,
        marginVertical: 48,
        paddingHorizontal: 14,
    },
    loginBtn: {
        width: 320,
        height: 54,
        borderRadius: 10,
        backgroundColor: '#4185f4',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 3
        },
        shadowOpacity: 0.084,
        shadowRadius: 10
    },
    loginLogo: {
        width: 36,
        height: 36,
        borderRadius: 4,
        marginRight: 24
    },
    loginText: {
        color: '#fff',
        fontSize: 18
    }
})
import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Google from 'expo-google-app-auth';

export default function Login() {

    const [user, setUser] = useState(null);

    const config = {
        iosClientId: `595824997092-1tgu6unnskaj3vsojgiog8l2bmf7lhmk.apps.googleusercontent.com`,
        androidClientId: `595824997092-0hjnftbq6qcu462233il7vbtvfs7kj5c.apps.googleusercontent.com`,
    }

    const textData = ['기존의 복잡한 택배 과정 없이,', '개인정보 유출이 가능한 송장이 필요 없이,', '원클릭으로 AI가 알아서 보내주고', '실시간 배송 추적이 가능한 앱']

    const onPress = async () => {
        const { type, accessToken, user } = await Google.logInAsync(config);

        if (type === 'success') {
            // Then you can use the Google REST API
            let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setUser(JSON.stringify(user));
        } else {
            Alert.alert("로그인 오류", "Google 로그인을 다시 확인해 주세요");
        }
    }

    return (
        <>
            <StatusBar style='auto' />
            <View style={styles.texts}>
                <Text style={styles.subTitle}>바로 배송 가능한 드론 택배 서비스</Text>
                <Text style={styles.title}>Interceptor</Text>
                {
                    textData.map((text, index) =>
                        <Text style={styles.subText} key={index}>{text}</Text>
                    )
                }
            </View>
            <Image style={styles.image} source={require('./assets/drone_main.png')} />
            <TouchableOpacity style={styles.loginBtn} onPress={onPress}>
                <Image style={styles.loginLogo} source={require('./assets/g-logo.png')} />
                <Text style={styles.loginText}>Sign in with Google</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
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
        marginVertical: 52,
        paddingHorizontal: 14
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
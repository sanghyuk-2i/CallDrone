import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Button, Switch, TouchableOpacity } from 'react-native'
import Back from './common/Back';

export default function SettingMenu({ navigation }) {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const viewData = {
        textData: ['포르필 사진 변경', '닉네임 변경', '비밀번호 변경'],
        bottomIcon: [require('../assets/icon/setting/logo_one.png'), require('../assets/icon/setting/logo_two.png')]
    }

    return (
        <View style={styles.container}>
            <Back navigation={navigation} />
            <View style={styles.TitleWrapper}>
                <View style={styles.Title}>
                    <Text style={styles.TitleText}>설정</Text>
                </View>
            </View>

            <View style={styles.SetMenuWrapper}>
                <View style={styles.ProfileWrapper}>
                    <Image
                        source={require('../assets/ict.png')}
                        style={styles.Profile}
                        resizeMode={'contain'}>
                    </Image>
                    <Text style={styles.ProfileText}>한이음</Text>
                </View>
                <View style={styles.WhiteLineWrapper}></View>
                {
                    viewData.textData.map((v, i) =>
                        <TouchableOpacity style={styles.buttonContainer} key={i}>
                            <Text style={styles.buttonText}>{v}</Text>
                            <Image
                                source={require('../assets/icon/setting/right.png')}
                                style={styles.ProfileIcon} >
                            </Image>
                        </TouchableOpacity>
                    )
                }
                <View style={styles.WhiteLineWrapper}></View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>다크모드</Text>
                    <Switch
                        trackColor={{ false: "#e5386d", true: "#e5386d" }}
                        thumbColor={isEnabled ? "white" : "white"}
                        ios_backgroundColor="#e5386dre"
                        onValueChange={toggleSwitch}
                        value={isEnabled} />
                </View>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>고객센터</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.BottomHeaderWrapper}>
                <View style={styles.BottomWrapper}>
                    <TouchableOpacity><Text style={styles.Logout}>로그아웃</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.bottomText}>개인정보처리방침</Text></TouchableOpacity>
                    <Text style={styles.bottomText}>© 2021. Interceptor all rights reserved.</Text>
                    <View style={styles.BottomImage}>
                        {
                            viewData.bottomIcon.map((v, i) =>
                                <Image
                                    source={v}
                                    style={styles.hanImage}
                                    resizeMode={'contain'}
                                    key={i} />
                            )
                        }
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    TitleWrapper: {
        marginTop: 60,
    },
    Title: {
        marginTop: 20,
        marginLeft: 40,
    },
    TitleText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: 'black',
    },
    SetMenuWrapper: {
        backgroundColor: '#f6f6f6',
        width: 320,
        height: 430,
        alignSelf: "center",
        borderRadius: 15,
        marginTop: 20,
        shadowColor: 'rgb(0,0,0)',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4
        }
    },
    ProfileWrapper: {
        width: '80%',
        flexDirection: "row",
        marginTop: 28,
        marginBottom: 6,
        alignSelf: 'center'
    },
    Profile: {
        width: 50,
        height: 50,
        borderRadius: 35,
        backgroundColor: 'black'
    },
    ProfileText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 12,
        alignSelf: 'center'
    },
    ProfileIcon: {
        width: 14,
        height: 14,
        alignSelf: 'center'
    },
    buttonContainer: {
        width: '80%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: 'center',
        paddingVertical: 16
    },
    buttonText: {
        fontWeight: '600',
        paddingLeft: 8,
        alignSelf: 'center'
    },
    WhiteLineWrapper: {
        width: '80%',
        height: 2,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginVertical: 12
    },
    BottomHeaderWrapper: {
        //alignSelf: "center",
    },
    BottomWrapper: {
        alignSelf: "center",
        marginTop: 10,
    },
    Logout: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e96d65',
        alignSelf: "center",
        marginTop: 15,
    },
    bottomText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'gray',
        alignSelf: "center",
        marginTop: 14,
    },
    BottomImage: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 4,
    },
    hanImage: {
        width: 50,
        height: 50,
        margin: 4
    },
});



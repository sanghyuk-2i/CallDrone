import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Back from './common/Back';
import { API_GATEWAY } from '@env';

export default function DeliveryRecordMenu({ navigation, user }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        console.log(`length: ${data.length}`)
        if (!data.length) {
            fetch(API_GATEWAY + user.id,
                { method: 'GET', mode: 'no-cors', headers: { 'Content-Type': 'application/json' } })
                .then((res) => {
                    return res.json();
                })
                .then((json_data) => {
                    setData([...json_data.Items])
                    // if (data.length === 0) {
                    //     setData([{
                    //         "timestamp": { "N": 0 }
                    //     }]);
                    // }
                })
        }
        console.log(data);
    });

    return (
        <>
            <StatusBar style='auto' />
            <View style={styles.container}>
                <Back navigation={navigation} />
                <View style={styles.HeaderWrapper}>
                    <View style={styles.TitleTextWrapper}>
                        <Text style={styles.TitleText}>배송 이력</Text>
                    </View>
                </View>
                <ScrollView style={styles.ScrollHeader}>
                    {
                        data.map((v, i) => {
                            if (i === 0 && data[i]['timestamp']['N'] === 0) {
                                <View></View>
                            } else {
                                return (
                                    <View style={styles.RecordWrapper} key={i}>
                                        <View style={styles.RecordMap}>
                                            <Image
                                                source={require('../assets/maptest.png')}
                                                style={styles.RecordMapSize}>
                                            </Image>
                                        </View>
                                        <View style={styles.RecordTextWrapper}>
                                            <View style={styles.RecordDateIdMenu}>
                                                <View style={styles.dateContainer}>
                                                    <Text style={styles.Date}>{Number(data[i]["timestamp"]["N"])}</Text>
                                                    <Text style={styles.DroneId}>{JSON.parse(data[i]['drone']['S'])['drone_id']}</Text>
                                                </View>
                                                <View style={styles.dateContainerTwo}>
                                                    <TouchableOpacity style={styles.MenuContainer}>
                                                        <Image
                                                            source={require('../assets/setmenu.png')}
                                                            style={styles.SetMenu} >
                                                        </Image>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={styles.TextBox}>
                                                <View style={styles.boxAddress}>
                                                    <View style={styles.addressIcon}>
                                                        {
                                                            [...Array(2)].map((v, i) =>
                                                                <View style={styles.circleContainer} key={i}>
                                                                    <View style={styles.circle}></View>
                                                                </View>
                                                            )
                                                        }
                                                    </View>
                                                    <View style={styles.addressText}>
                                                        <View style={styles.textContainer}>
                                                            <Text style={styles.textText}>{JSON.parse(data[i]['drone']['S'])['start']['address']}</Text>
                                                        </View>
                                                        <View style={styles.textContainer}>
                                                            <Text style={styles.textText}>{JSON.parse(data[i]['drone']['S'])['end']['address']}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={styles.boxLine}>
                                                    <View style={styles.line}></View>
                                                </View>
                                                <View style={styles.boxDetail}>
                                                    <View style={styles.detailContainer}>
                                                        <Text style={styles.detailTitle}>주행거리</Text>
                                                        <Text style={styles.detailText}>{`${JSON.parse(data[i]['drone']['S'])['distance']}분`}</Text>
                                                    </View>
                                                    <View style={styles.detailContainer}>
                                                        <Text style={styles.detailTitle}>비행시간</Text>
                                                        <Text style={styles.detailText}>{`${JSON.parse(data[i]['drone']['S'])['time']}분`}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }
                        }
                        )
                    }

                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    HeaderWrapper: {
        marginTop: 80,
        marginLeft: 20,
    },
    TitleText: {
        color: 'black',
        fontSize: 48,
        fontWeight: 'bold',
    },
    ScrollHeader: {
        marginTop: 30,
    },
    RecordWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F6F6F6",
        borderRadius: 15,
        width: '90%',
        height: 320,
        marginTop: 14,
        alignSelf: 'center',
        shadowColor: 'rgb(0,0,0)',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4
        },
    },
    RecordMap: {
        width: '85%',
        height: '40%',
        borderRadius: 15,
        alignSelf: 'center',
        marginVertical: 12,
    },
    RecordMapSize: {
        width: '100%',
        height: '100%',
        borderRadius: 15
    },
    RecordTextWrapper: {
        backgroundColor: "#FFF",
        borderRadius: 15,
        width: '90%',
        height: '45%',
    },
    RecordDateIdMenu: {
        flexDirection: "row",
        height: '15%',
        alignItems: 'center',
        paddingHorizontal: 12
    },
    dateContainer: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
    },
    dateContainerTwo: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    Date: {
        color: 'gray',
        fontSize: 12,
        fontWeight: 'bold',
    },
    DroneId: {
        color: 'gray',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    MenuContainer: {
        width: 20,
        height: 20,
    },
    SetMenu: {
        width: 20,
        height: 20
    },
    TextBox: {
        height: '85%',
        flexDirection: "row",
        marginVertical: 4
    },
    boxAddress: {
        display: 'flex',
        flexDirection: 'row',
        width: '60%',
        paddingVertical: 4,
        paddingLeft: 12
    },
    addressIcon: {
        width: '15%',
        height: '100%',
    },
    circleContainer: {
        height: '50%'
    },
    circle: {
        borderWidth: 5,
        borderRadius: 50,
        width: 20,
        height: 20
    },
    addressText: {
        width: '85%',
        height: '100%',
    },
    textContainer: {
        height: '50%',
    },
    textText: {
        fontWeight: '600',
        paddingTop: 3
    },
    boxLine: {
        width: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    line: {
        width: 3,
        height: '80%',
        backgroundColor: 'black',
    },
    boxDetail: {
        width: '35%',
        marginLeft: 8
    },
    detailContainer: {
        height: '50%'
    },
    detailTitle: {
        fontSize: 16,
        fontWeight: '800',
        marginVertical: 4
    },
    detailText: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 4,
        textAlign: 'center'
    }
});



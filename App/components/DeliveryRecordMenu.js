import React from 'react'
import { View, Text, Image, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Back from './common/Back';

export default function DeliveryRecordMenu({ navigation }) {
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
                        [...Array(3)].map((v, i) =>
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
                                            <Text style={styles.Date}>2021/06/18</Text>
                                            <Text style={styles.DroneId}>ID123456</Text>
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
                                                {
                                                    [...Array(2)].map((v, i) =>
                                                        <View style={styles.textContainer} key={i}>
                                                            <Text style={styles.textText}>경기도</Text>
                                                        </View>
                                                    )
                                                }
                                            </View>
                                        </View>
                                        <View style={styles.boxLine}>
                                            <View style={styles.line}></View>
                                        </View>
                                        <View style={styles.boxDetail}>
                                            {
                                                [...Array(2)].map((v, i) =>
                                                    <View style={styles.detailContainer} key={i}>
                                                        <Text style={styles.detailTitle}>주행거리</Text>
                                                        <Text style={styles.detailText}>2.54km</Text>
                                                    </View>
                                                )
                                            }
                                        </View>
                                    </View>
                                </View>
                            </View>
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



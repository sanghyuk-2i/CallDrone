import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Menu({ navigation, user }) {

    const viewData = {
        stackName: ['delivery', 'receipt', 'realtime', 'setting', 'monitoring'],
        titleData: ['배송', '이력', '실시간 추적', '설정', '모니터링'],
        iconData: [require('../assets/icon/menu/box.png'), require('../assets/icon/menu/bill.png'), require('../assets/icon/menu/route.png'), require('../assets/icon/menu/settings.png'), require('../assets/icon/menu/pie-chart.png')]
    }

    return (
        <>
            <StatusBar style={'auto'} />
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                    <Text style={styles.headerText}>Interceptor</Text>
                    <View style={styles.profileBin}>
                        <Image
                            source={{ uri: user.photoUrl }}
                            style={styles.profileImage} >
                        </Image>
                        <Text style={styles.profileText}>{user.name}</Text>
                    </View>
                </View>
                <View style={styles.viewMenu}>
                    {
                        viewData.titleData.map((v, i) => {
                            if (i === 2) {
                                return (
                                    <TouchableOpacity style={styles.menuButtonTwo} key={i} onPress={() => navigation.navigate(viewData.stackName[i])}>
                                        <Text style={styles.menuText}>{v}</Text>
                                        <Image
                                            source={viewData.iconData[i]}
                                            style={styles.menuIconTwo} >
                                        </Image>
                                    </TouchableOpacity>
                                )
                            } else {
                                return (
                                    <TouchableOpacity style={styles.menuButton} key={i} onPress={() => navigation.navigate(viewData.stackName[i])}>
                                        <Text style={styles.menuText}>{v}</Text>
                                        <Image
                                            source={viewData.iconData[i]}
                                            style={styles.menuIcon} >
                                        </Image>
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }
                </View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex'
    },
    headerWrapper: {
        width: '100%',
        marginTop: 90,
        marginHorizontal: 20
    },
    headerText: {
        color: 'black',
        fontSize: 48,
        fontWeight: 'bold',
    },
    profileBin: {
        flexDirection: "row",
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 35,
    },
    profileText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: "center",
        marginLeft: 15,
    },
    viewMenu: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        height: '70%',
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        marginVertical: 12,
    },
    menuButton: {
        width: 160,
        borderRadius: 8,
        marginHorizontal: 4,
        backgroundColor: '#F6F6F6',
        shadowColor: 'rgb(0,0,0)',
        shadowOpacity: 0.25,
        shadowOffset: {
            height: 4,
            width: 4,
        },
    },
    menuButtonTwo: {
        width: 330,
        borderRadius: 8,
        margin: 8,
        backgroundColor: '#F6F6F6',
        shadowColor: 'rgb(0,0,0)',
        shadowOpacity: 0.25,
        shadowOffset: {
            height: 4,
            width: 4,
        },
    },
    menuText: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: "flex-start",
        marginTop: 20,
        marginLeft: 20,
    },
    menuIcon: {
        width: 70,
        height: 70,
        marginVertical: 24,
        alignSelf: 'center'
    },
    menuIconTwo: {
        width: 70,
        height: 70,
        marginVertical: 24,
        marginRight: 36,
        alignSelf: 'flex-end',
    },
});


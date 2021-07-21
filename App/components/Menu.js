import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'

export default function Menu() {
    return (
        <View style={styles.container}>

            {/*Header*/}
            <View style={styles.headerWrapper}>
                <Text style={styles.headerText}>Interceptor</Text>
            </View>

            {/*Profile*/}
            <View style={styles.profileWrapper}>
                <SafeAreaView>
                    <View style={styles.profileBin}>
                        <Image
                            source={require('../assets/ict.png')}
                            style={styles.profileImage} >
                        </Image>
                        <Text style={styles.profileText}>한이음 </Text>
                    </View>
                </SafeAreaView>
            </View>

            {/* MenuDeliHIs*/}
            <View style={styles.MenuDeliHisWrapper}>

                {/* MenuDeli*/}
                <View style={styles.MenuDeliWrapper}>
                     <Text style={styles.MenuDeliText}> 배송</Text>
                    <Image
                        source={require('../assets/menubox.png')}
                        style={styles.MenuDeliIcon} >
                    </Image>
                </View>

                {/* MenuHIs*/}
                <View style={styles.MenuHisWrapper}>
                    <Text style={styles.MenuHisText}> 이력</Text>
                    <Image
                        source={require('../assets/menuhistory.png')}
                        style={styles.MenuHisIcon} >
                    </Image>
                </View>
            </View>

            {/*MenuRealTime*/}
            <View style={styles.MenuRealTimeWrapper}>
                <View style={styles.MenuRealTimeInWrapper}>
                    <Text style={styles.MenuRealTimeText}>실시간 추적</Text>
                    <Image 
                        source={require('../assets/menurealtime.png')}
                        style={styles.MenuRealTimeIcon}  > 
                    </Image>
                </View>
            </View>

            {/*MenuSetMoni*/}
            <View style={styles.MenuSetMoniWrapper}>
                {/* MenuSet*/}
                <View style={styles.MenuSetWrapper}>
                     <Text style={styles.MenuSetText}> 설정</Text>
                    <Image
                        source={require('../assets/menusetting.png')}
                        style={styles.MenuSetIcon} >
                    </Image>
                </View>

                {/* MenuMoni*/}
                <View style={styles.MenuMoniWrapper}>
                    <Text style={styles.MenuMoniText}>모니터링</Text>
                    <Image
                        source={require('../assets/menumonitor.png')}
                        style={styles.MenuMoniIcon} >
                    </Image>
                </View>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerWrapper: {
        marginTop: 70,
        marginLeft: 20,
    },
    headerText: {
        color: 'black',
        fontSize: 50,
        fontWeight: 'bold',
    },
    profileWrapper: {
        marginLeft: 20,
        marginTop: 10,
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

    //MenuDeliHIs
    MenuDeliHisWrapper: {
        marginLeft: 20,
        flexDirection: "row",
        justifyContent:'space-between',
        marginTop:20,
       
    },
    MenuDeliWrapper: {
        backgroundColor: "#F6F6F6",
        borderRadius: 15,
        width: 165,
        height: 170,
    },
    MenuDeliIcon: {
        width: 70,
        height: 70,
        marginTop: 25,
        alignSelf: "center",
        marginBottom:20,
    },
    MenuDeliText: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: "flex-start",
        marginTop:20,
        marginLeft:20,
    },
    MenuHisWrapper:{
        backgroundColor: "#F6F6F6",
        marginRight:20,
        borderRadius: 15,
        width: 165,
        height: 170,
    
    },
    MenuHisIcon:{
        width: 70,
        height: 70,
        marginTop: 25,
        alignSelf: "center",
        marginBottom:20,
        
    },
    MenuHisText:{
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: "flex-start",
        marginTop:20,
        marginLeft:20,
    },
    //MenuRealTime
    MenuRealTimeWrapper:{
        marginLeft: 20,
        marginTop:10,
    },
    MenuRealTimeInWrapper:{
        backgroundColor: "#F6F6F6",
        borderRadius: 15,
        width: 350,
        height: 150,
    },
    MenuRealTimeText:{
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: "flex-start",
        marginTop:20,
        marginLeft:20,
    },
    MenuRealTimeIcon:{
        width: 70,
        height: 70,
        alignSelf: "flex-end",
        marginBottom:30,
        marginRight:30,
    },

    //
    MenuSetMoniWrapper: {
        marginLeft: 20,
        flexDirection: "row",
        justifyContent:'space-between',
        marginTop:10,
        marginBottom:10,
    },
    MenuSetWrapper: {
        backgroundColor: "#F6F6F6",
        borderRadius: 15,
        width: 130,
        height: 170,
    },
    MenuSetIcon: {
        width: 70,
        height: 70,
        marginTop: 25,
        alignSelf: "center",
        marginBottom:20,
    },
    MenuSetText: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: "center",
        marginTop:20,
        marginRight:10,
    },
    MenuMoniWrapper:{
        backgroundColor: "#F6F6F6",
        marginRight:20,
        borderRadius: 15,
        width: 200,
        height: 170,
       
    },
    MenuMoniIcon:{
        width: 70,
        height: 70,
        marginTop: 25,
        alignSelf: "center",
        marginBottom:20,
        
    },
    MenuMoniText:{
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: "flex-start",
        marginTop:20,
        marginLeft:20,
    },
    


});


import React from 'react'
import {  View, Text, Image, StyleSheet, Button } from 'react-native'
export default function MonitoringMenu() {
    return (

    <View style={styles.container}>
        <View style={styles.HeaderWrapper}>
            <View style={styles.HeaderSeries}>
                <Text style={styles.HeaderSeriesText}>Drone Series 1</Text>
            </View>
            <View style={styles.HeaderId}>
                <Text style={styles.HeaderIdText}>#ID12345</Text>
            </View>
            <View style={styles.HeaderImage}>
                <Image
                    style={styles.HeaderImageIcon} 
                    source={require('../assets/drone2.png')}>
                </Image>
            </View>

        </View>
        <View style={styles.DetailWrapper}>
            <View style={styles.DetailOne}>
                <Image
                    style={styles.DetailOneIcon} 
                    source={require('../assets/greencircle.png')}>
                </Image>
                <Text style={styles.DetailOneText}>Online</Text>
            </View>
            <View style={styles.DetailTwo}>
                <Image
                    style={styles.DetailTwoIcon} 
                    source={require('../assets/greencircle.png')}>
                </Image>
                <Text style={styles.DetailTwoText}>Ready</Text>
                
            </View>
        </View>
        <View style={styles.DetailClick}>
            <Text style={styles.DetailClickText}>세부사항 </Text>
        </View>


    </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    HeaderWrapper:{
        marginTop:110,
        alignSelf: "center",
    },
    HeaderSeries:{
        alignSelf: "center",
    },
    HeaderSeriesText:{
        fontSize:20,
        fontWeight:'bold',
        color:'black',
    },
    HeaderId:{
        alignSelf: "center",
    },
    HeaderIdText:{
        fontSize:43,
        fontWeight:'bold',
        color:'black',
    },
    HeaderImage:{
        marginTop:15,
    },
    HeaderImageIcon:{

    },
    DetailWrapper:{
        alignSelf: "center",
    },

    DetailOne:{
        marginTop:20,
        flexDirection: "row",
    },
    DetailOneIcon:{
       marginTop:3,
       marginRight:20,
    },
    DetailOneText:{
        fontSize:20,
        fontWeight:'bold',
        color:'black',
    },
    DetailTwo:{
        marginTop:20,
        flexDirection: "row",
    },
    DetailTwoIcon:{
        marginTop:3,
        marginRight:20,
    },
    DetailTwoText:{
        fontSize:20,
        fontWeight:'bold',
        color:'black',
    },
    DetailClick:{
        alignSelf: "center",
        marginTop:30,
        marginLeft:20,

    },
    DetailClickText:{
        fontSize:20,
        fontWeight:'bold',
        color:'gray',
        borderBottomColor:'gray',
        borderBottomWidth:2,
    },
});



import React from 'react'
import {  View, Text, Image, StyleSheet, Button } from 'react-native'
export default function MonitoringDeatailMenu() {
    return (

    <View style={styles.container}>

        {/**         <View style={styles.HeaderWrapper}>
            <View  style={styles.HeaderTextDetail}> 
                <Text  style={styles.HeaderTextSeries}>Drone Series 1</Text>
                <Text  style={styles.HeaderTextId}>#Id12345</Text>
            </View>
            <View style={styles.HeaderIcon}>
                <Image
                 source={require('../assets/drone.png')}
                 style={styles.HeaderDroneIcon} >
                </Image>
            </View>
        </View>
        */}
        

        <View style={styles.DetailInfoWrapper}>
            <View style={styles.DetailInfoTitle}>
                <Text style={styles.DetailTitle}>세부정보</Text>
            </View>
            {/*숫자 들어갈 매개변수 부분*/}
            <View style={styles.AltitudeBatteryTemperature}>
                <View style={styles.Altitude}>
                    <Text style={styles.AltitudeNumber}>100</Text>
                    <Text style={styles.AltitudeSign}>m</Text>                
                </View>
                <View style={styles.Battery}>
                    <Text style={styles.BatteryNumber}>100</Text>
                    <Text style={styles.BatterySign}>%</Text>       
                </View>
                <View style={styles.Temperature}>
                    <Text style={styles.TemperatureNumber}>32</Text>
                    <Text style={styles.TemperatureSign}>°C</Text>  
                </View>
            </View>
            {/*고도 배터리 온도 아이콘 이름 코드부분*/}
            <View style={styles.ImageName}>
                 <View style={styles.AltitudeSet}>
                     <Image 
                        source={require('../assets/terrain.png')}
                        style={styles.AltitudeIcon} > 
                    </Image>
                     <Text style={styles.AltitudeName}>고도</Text>  
                 </View>

                 <View style={styles.BatterySet}>
                     <Image 
                        source={require('../assets/battery_full.png')}
                        style={styles.BatteryIcon} > 
                    </Image>
                     <Text style={styles.BatteryName}>배터리</Text>  
                 </View>

                 <View style={styles.TemperatureSet}>
                     <Image 
                        source={require('../assets/thermostat.png')}
                        style={styles.TemperatureIcon} > 
                    </Image>
                     <Text style={styles.TemperatureName}>온도</Text>  
                 </View>
            </View>
            {/*숫자 들어갈 매개변수 부분*/}
            <View style={styles.OnOff}>
                <Text style={styles.OnOffText}>ON</Text>
                <Text style={styles.OnOffText}>ON</Text>
            </View>

            {/*gps 연결 아이콘 이름 코드부분*/}
            <View style={styles.OnOffImageName}>
                <View style={styles.OnOffImageNameRow}>
                    <Image 
                        source={require('../assets/gpsicon.png')}
                     style={styles.GPSIcon} > 
                    </Image>
                    <Text style={styles.GPSName}>GPS</Text> 
                </View>
                <View style={styles.OnOffImageNameRow}>
                    <Image 
                        source={require('../assets/signal_cellular_alt.png')}
                        style={styles.ConnectionIcon} > 
                    </Image>
                    <Text style={styles.ConnectionName}>연결</Text>   
                </View>
    
            </View>
            {/* 숫자 들어갈 매개변수 부분*/}
            <View style={styles.SpeedRoatationNumber}>
                <Text style={styles.SpeedRoatationText}>100</Text>
                <View  style={styles.SPBin}> 
                    <Text style={styles.SpeedRoatationText}>50</Text>
                    <Text style={styles.SpeedRoatationTextText}>도</Text>
                </View>
                
            </View>


            {/*비행속도 회전 아이콘 이름 코드부분*/}
            <View style={styles.SpeedRotation}>
                <View style={styles.SpeedRotationRow}>
                    <Image 
                        source={require('../assets/windy.png')}
                     style={styles.SpeedIcon} > 
                    </Image>
                    <Text style={styles.SpeedName}>비행속도</Text> 
                </View>
                <View style={styles.SpeedRotationRow}>
                    <Image 
                        source={require('../assets/screen_rotation.png')}
                        style={styles.RotationIcon} > 
                    </Image>
                    <Text style={styles.CRotationName}>회전</Text>   
                </View>

            </View>
            {/*현재지역 날씨 부분*/}
            <View style={styles.WeatherWrapper}>
                <Text style={styles.WeatherTitle}>현재 지역 날씨 </Text>

                <View style={styles.WeatherData}>
                    <Image 
                        source={require('../assets/clear-cloudy.png')}
                        style={styles.WeatherIcon} > 
                    </Image>
                    <View  style={styles.WeatherTempWrapper}>
                        <Text style={styles.WeatherTemp}>32</Text> 
                        <Text style={styles.WeatherTempSign}>°C</Text> 
                    </View>
                    <View style={styles.WeatherWindWrapper}>
                        <Text style={styles.WeatherWind}>19.5</Text> 
                        <Text style={styles.WeatherSign}>m/s</Text> 
                    </View>
                     
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
    
    HeaderWrapper:{
        flexDirection: "column",
       justifyContent:"space-between",
    },
    HeaderText:{

    },
    
    HeaderTextDetail:{
      
    },
    HeaderTextSeries:{
        fontSize:16,
        fontWeight:'bold',
        color:'black',
    },
    HeaderTextId:{
        fontSize:16,
        fontWeight:'bold',
        color:'black',
    },
    HeaderIcon:{

    },
    HeaderDroneIcon:{

    },
    
    //
    //
    DetailInfoWrapper:{
        marginTop:30,
        //flexDirection:"column",
    },
    DetailInfoTitle:{
        marginTop:30,
        marginLeft:20,
    },
    DetailTitle:{
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
    },

    //
    AltitudeBatteryTemperature:{
        justifyContent:"space-around", 
        flexDirection:"row",
        marginTop:30,
    },
    Altitude:{
        marginTop:10,
        flexDirection:"row",
    },
    AltitudeNumber :{
        color: 'black',
        fontSize: 35,
        fontWeight: 'bold',
    },
    AltitudeSign:{
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop:11,
    },
    Battery :{
        marginTop:10,
        flexDirection:"row",
    },
    BatteryNumber :{
        color: 'black',
        fontSize: 35,
        fontWeight: 'bold',
    },
    BatterySign :{
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop:12,
    },
    Temperature :{
        flexDirection:"row",
        marginTop:10,
    },
    TemperatureNumber :{
        color: 'black',
        fontSize: 35,
        fontWeight: 'bold',
    },
    TemperatureSign:{
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop:12,
        
    },

    //
    ImageName :{
        justifyContent:"space-around", 
        flexDirection:"row",
    },
    AltitudeSet :{
        marginTop:10,
        flexDirection:"row",
    },
    AltitudeIcon :{
        width:30,
        height:30,
    },
    AltitudeName:{
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop:4,
    },
    BatterySet :{
        marginTop:10,
        flexDirection:"row",
    },
    BatteryIcon :{
        width:30,
        height:30,
    },
    BatteryName:{
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop:4,
    },
    TemperatureSet :{
        marginTop:10,
        flexDirection:"row",
    },
    TemperatureIcon :{
        width:30,
        height:30,
    },
    TemperatureName:{
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop:4,
    },
    OnOff:{
        justifyContent:"space-evenly", 
        flexDirection:"row",
        marginTop:20,
    },
    OnOffText:{
        color: 'black',
        fontSize: 35,
        fontWeight: 'bold',
        
    },

    OnOffImageName:{
        justifyContent:"space-evenly", 
        flexDirection:"row",
        marginTop:20,
    },
    OnOffImageNameRow:{
        flexDirection:"row",
    },
    GPSIcon:{
        width:30,
        height:30,    
    },
    GPSName:{
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop:4,
        marginLeft:4,
    },
    ConnectionIcon:{
        width:30,
        height:30,   
    },
    ConnectionName:{
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop:4,
        marginLeft:4,
    },  
    SpeedRoatationNumber:{
        justifyContent:"space-evenly", 
        flexDirection:"row",
        marginTop:20,
    },
    SpeedRoatationText:{
        color: 'black',
        fontSize: 35,
        fontWeight: 'bold',
    },
    SPBin:{
        flexDirection:"row",
    },
    SpeedRoatationTextText:{
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop:10,
       
    },
    //
    SpeedRotation:{
        justifyContent:"space-evenly", 
        flexDirection:"row",
        marginTop:20,
    },
    SpeedRotationRow:{
        flexDirection:"row",
    },
    SpeedIcon:{
        width:30,
        height:30,    
    },
    SpeedName:{
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop:4,
        marginLeft:4,
    },
    RotationIcon:{
        width:30,
        height:30,   
    },
    CRotationName:{
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop:4,
        marginLeft:4,
    },  
    WeatherWrapper:{
        marginTop:40,
        marginLeft:20,
    },
    WeatherTitle:{
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
    },
    WeatherData:{
        justifyContent:"space-around", 
        flexDirection:"row",
        marginTop:40,
    },
    WeatherIcon:{
        
    },
    WeatherTempWrapper:{
        flexDirection:"row",
    },
    WeatherTemp:{
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
    },
    WeatherTempSign:{
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop:10,
    },
    WeatherWindWrapper:{
        flexDirection:"row",
    },
    WeatherWind:{
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
    },
    WeatherSign:{
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop:10,
    },
});



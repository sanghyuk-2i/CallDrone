import React from 'react'
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native'
export default function DeliveryRecordMenu() {
    return (

        <View style={styles.container}>

            {/*제목*/}
            <View style={styles.HeaderWrapper}>
                <View style={styles.TitleTextWrapper}>
                    <Text style={styles.TitleText}>배송 이력</Text>
                </View>
            </View>

            {/*스크롤뷰*/}
            <ScrollView style={styles.ScroleHeader}>
                
                <View style={styles.RecordWrapper}>

                    <View style={styles.RecordMap}>
                        <Image 
                            source={require('../assets/maptest.png')}
                            style={styles.RecordMapSize}> 
                        </Image>
                    </View>

                    <View style={styles.RecordTextWrapper}>

                        <View style={styles.RecordDateIdMenu}>
                            <Text style={styles.Date}>2021/06/18</Text>
                            <Text style={styles.DroneId}>ID123456</Text>
                            <Image 
                                source={require('../assets/setmenu.png')} 
                                style={styles.SetMenu} >       
                            </Image>
                        </View>

                        <View style={styles.TextBox}>

                            <View style={styles.TextOne}>  
                                <Image 
                                    source={require('../assets/circleicon.png')}
                                    style={styles.circleline}> 
                                </Image>
                                {/*<View style={styles.TextOnerow}> 
                                   

                                </View> */}
                                <Text style={styles.TextAddress}>경기도</Text>
                                <Image 
                                    source={require('../assets/longrowline.png')}
                                    style={styles.longrowLine} >    
                                </Image>
                                <Text style={styles.TextValue}>주행거리</Text>
                                <Text style={styles.TextNumber}> 2.54</Text>
                                <Text style={styles.TextAddressUnit}>km</Text>
                            </View>
                
                            <View style={styles.TextThree}>
                                <Image
                                     source={require('../assets/circleicon.png')}>   
                                </Image>
                                <Text style={styles.TextAddressThree}>용인시</Text>
                                <Text style={styles.TextValueThree}>비행시간</Text>
                                <Text style={styles.TextNumberThree}> 34</Text>
                                <Text style={styles.TextAddressUnitThree}>분</Text>
                            </View>

                        </View>

                    </View>
                </View>

         

            {/*두번째 스크롤 실험*/}
                <View style={styles.RecordWrapper}>

                    <View style={styles.RecordMap}>
                        <Image 
                            source={require('../assets/maptest.png')}
                            style={styles.RecordMapSize}> 
                        </Image>
                    </View>

                    <View style={styles.RecordTextWrapper}>

                        <View style={styles.RecordDateIdMenu}>
                            <Text style={styles.Date}>2021/06/18</Text>
                            <Text style={styles.DroneId}>ID123456</Text>
                            <Image 
                                source={require('../assets/setmenu.png')} 
                                style={styles.SetMenu} >       
                            </Image>
                        </View>

                        <View style={styles.TextBox}>

                            <View style={styles.TextOne}>  
                                <Image 
                                    source={require('../assets/circleicon.png')}
                                    style={styles.circleline}> 
                                </Image>
                                {/*<View style={styles.TextOnerow}> 
                                   

                                </View> */}
                                <Text style={styles.TextAddress}>경기도</Text>
                                <Image 
                                    source={require('../assets/longrowline.png')}
                                    style={styles.longrowLine} >    
                                </Image>
                                <Text style={styles.TextValue}>주행거리</Text>
                                <Text style={styles.TextNumber}> 2.54</Text>
                                <Text style={styles.TextAddressUnit}>km</Text>
                            </View>
                
                            <View style={styles.TextThree}>
                                <Image
                                     source={require('../assets/circleicon.png')}>   
                                </Image>
                                <Text style={styles.TextAddressThree}>용인시</Text>
                                <Text style={styles.TextValueThree}>비행시간</Text>
                                <Text style={styles.TextNumberThree}> 34</Text>
                                <Text style={styles.TextAddressUnitThree}>분</Text>
                            </View>

                        </View>

                    </View>
                </View>
                {/*세번쨰 스크롤 */}
                <View style={styles.RecordWrapper}>

                    <View style={styles.RecordMap}>
                        <Image
                            source={require('../assets/maptest.png')}
                            style={styles.RecordMapSize}>
                        </Image>
                    </View>

                    <View style={styles.RecordTextWrapper}>

                        <View style={styles.RecordDateIdMenu}>
                            <Text style={styles.Date}>2021/06/18</Text>
                            <Text style={styles.DroneId}>ID123456</Text>
                            <Image
                                source={require('../assets/setmenu.png')}
                                style={styles.SetMenu} >
                            </Image>
                        </View>

                        <View style={styles.TextBox}>

                            <View style={styles.TextOne}>
                                <Image
                                    source={require('../assets/circleicon.png')}
                                    style={styles.circleline}>
                                </Image>
                                {/*<View style={styles.TextOnerow}> 
               

            </View> */}
                                <Text style={styles.TextAddress}>경기도</Text>
                                <Image
                                    source={require('../assets/longrowline.png')}
                                    style={styles.longrowLine} >
                                </Image>
                                <Text style={styles.TextValue}>주행거리</Text>
                                <Text style={styles.TextNumber}> 2.54</Text>
                                <Text style={styles.TextAddressUnit}>km</Text>
                            </View>

                            <View style={styles.TextThree}>
                                <Image
                                    source={require('../assets/circleicon.png')}>
                                </Image>
                                <Text style={styles.TextAddressThree}>용인시</Text>
                                <Text style={styles.TextValueThree}>비행시간</Text>
                                <Text style={styles.TextNumberThree}> 34</Text>
                                <Text style={styles.TextAddressUnitThree}>분</Text>
                            </View>

                        </View>

                    </View>
                </View>
                


            </ScrollView>

          
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    HeaderWrapper: {
        marginTop: 50,
        marginLeft: 50,
    },
    TitleText: {
        color: 'black',
        fontSize: 45,
        fontWeight: 'bold',

    },

    ScroleHeader: {
        alignSelf: "center",
        //backgroundColor:'red',
        marginTop:10,
    },
    RecordWrapper: {
        backgroundColor: "#F6F6F6",
        //backgroundColor: "red",
        borderRadius: 15,
        width: 320,
        height: 320,
        marginTop:20,
    },
    RecordMap: {
        alignSelf: "center",
        width:280,
        height:140,
        borderRadius:15,
        marginTop:10,
    },
    RecordMapSize:{

    },

    RecordTextWrapper: {
        backgroundColor: "#FFF",
        borderRadius: 15,
        width: 300,
        height: 150,
        alignSelf: "center",
        marginTop:5,
        
    },
    RecordDateIdMenu:{
        flexDirection: "row",
    },
    Date: {
        marginLeft:10,
        marginTop:5,
        color: 'gray',
        fontSize: 13,
        fontWeight: 'bold',
        alignSelf: "flex-start",
    },
    DroneId: {
        marginLeft:10,
        marginTop:5,
        alignSelf: "flex-start",
        color: 'gray',
        fontSize: 13,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    SetMenu: {
        width:20,
        height:20,
        marginLeft:110,
        marginTop:5,
    },
    TextBox: {
        //flexDirection: "row",
    },
    TextOne: {
        flexDirection: "row",
        marginLeft: 10,
        marginTop:5,
    },
    TextOnerow:{
        flexDirection: "row",
    },
    TextAddress: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    longrowLine: {
        marginLeft: 65,
    },
    TextValue: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
        marginTop:6,
    },
    TextNumber: {
        color: 'black',
        fontSize: 23,
        fontWeight: 'bold',
    },
    TextAddressUnit:{
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop:5,
        marginLeft:10,
    },
    TextThree: {
        flexDirection: "row",
        marginLeft: 10,
    },
    TextAddressThree:{
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
    },  
    TextValueThree:{
        fontSize:16,
        fontWeight:'bold',
        color:'black',
        marginLeft: 75,
    },
    TextNumberThree:{
        //marginBottom:20,
        color: 'black',
        fontSize: 23,
        fontWeight: 'bold', 
    },
    TextAddressUnitThree:{
    
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft:30,
    },


});



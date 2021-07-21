import React from 'react'
import { View, Text, Button ,StyleSheet,Image} from 'react-native'
export default function RealTimeMenu() {
    return (
    <View style={styles.container}>

        {/*Header*/}
        <View style={styles.HeaderWrapper}>
            <View style={styles.HeaderCircle}>
                <Image source={require('../assets/circleicon.png')}></Image>
            </View>
            <View style={styles.HeaderStartPoint}>
                <Text style={styles.StartPointText} >경기도 화성시 동탄 반석로 277 값 받아오기</Text>
            </View>

        </View>

        {/*RowLine*/}
        <View style={styles.RowLineWrapper}>
            <View style={styles.RowLine}>
                <Image source={require('../assets/rowline.png')}></Image>       
            </View>
        </View>

        {/*DestinationLine*/}
        <View style={styles.DestinationWrapper}>
            <View style={styles.DestinationCircle}>
                <Image source={require('../assets/circleicon.png')}></Image>
            </View>
            <View style={styles.DestinationBin}>
                <Text style={styles.DestinationPointText} >경기도 용인시 기흥구 강남서로58번길 값 받아오기</Text>
            </View>

        </View>
        
        {/*ScheduleTime*/}
        <View style={styles.ScheduleTimeWrapper}>
            <View style={styles.TimeTextWrapper}>
                <Text style={styles.TimeText}>50</Text>   
            </View>
            <View style={styles.PredicitonTextWrapper}>
                <Text style={styles.PrdicitonText}>분 후 도착 예정</Text>   
            </View>

        </View>
        {/*TwoButton*/}
        <View style={styles.TwoButtonWrapper}>
            <View style={styles.ShareButton}>
                <Button 
                    title="공유하기" 
                    color='black'> 
                </Button>
            </View>
            <View style={styles.CancelButton}> 
                <Button 
                    title="배송 취소"
                    color='black'
                    >
                         
                </Button>
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
        flexDirection: "row",
        marginTop:50,
    },
    HeaderCircle:{
        marginLeft:10,
        marginTop:3,
    },
    HeaderStartPoint:{
        
    },
    StartPointText:{
        fontSize:15,
        fontWeight:'bold',
        color:'black',
        marginTop:1,
        marginLeft:5,
    },
    RowLineWrapper:{
        marginLeft:10,
        marginTop:5,
    },
    RowLine:{
        marginLeft:9,
    },
    DestinationWrapper:{
        flexDirection: "row",
        marginTop:2,
        marginLeft:1,
    },
    DestinationCircle:{
        marginLeft:10,
        marginTop:3,
    },
    DestinationBin:{    
        //
    },
    DestinationPointText:{
        fontSize:15,
        fontWeight:'bold',
        color:'black',
        marginTop:1,
        marginLeft:5,
    },
    ScheduleTimeWrapper:{
        flexDirection: "row",
        marginTop:10,
        alignSelf: "center",
    },
    TimeTextWrapper:{
    },
    TimeText:{
        fontSize:50,
        fontWeight:'bold',
        color:'black',
    },
    PredicitonTextWrapper:{
        marginTop:20,
        marginLeft:20,
    },
    PrdicitonText:{
        fontSize:25,
        fontWeight:'bold',
        color:'black',

    },
    TwoButtonWrapper:{
        flexDirection: "row",
        alignSelf: "center",
        marginTop:10,
        width:200,
        
        
    },
    ShareButton:{
        width:100,
        marginRight:5,
        
    },
    CancelButton:{
        width:100,
        marginLeft:5,
       
    },



  });
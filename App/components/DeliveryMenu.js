import React from 'react'
import { View, Text, StyleSheet, Image, Button,TextInput } from 'react-native'




export default function DeliveryMenu() {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.HeaderWrapper}>
        <View style={styles.HeaderCircleOne}>
            <Image source={require('../assets/circleicon.png')}></Image>
        </View>
        <View style={styles.HeaderStartPoint}>
          <Text style={styles.HeaderStartPointText}>출발</Text>
        </View>
        <View style={styles.HeaderGPS}> 
          <Image source={require('../assets/gpsicon.png')}></Image>
        </View>
      </View>

      {/*FirstLine*/}
      <View style={styles.FirstLineWrapper}>
        <View style={styles.FirstRowLine}>
          <Image source={require('../assets/rowline.png')}></Image>
        </View>
        <View style={styles.GpsLine}>
          <TextInput style={styles.TextGpsline}></TextInput>
          {/*<Image style={styles.ColTextGpsline} source={require('../assets/colline.png')}></Image>*/}
        </View>
      </View>

      {/*TwoLine*/}
      <View style={styles.TwoLineWrapper}>
        <View style={styles.TwoLineCircleTWo}>
          <Image source={require('../assets/circleicon.png')}></Image>
        </View>
        <View style={styles.TwoLineDestination}>
          <Text style={styles.TwoLineDestinationText}>도착</Text>
        </View>
      </View>

      {/* ThirdLine*/}
      <View style={styles.ThirdLineWrapper}>
        <View style={styles.GpsLine}>
          <TextInput style={styles.TextGpsline}></TextInput>
        </View>
      </View>

      {/*DeliveryType*/}
      <View style={styles.DeliveryTypeWrapper}>
        <View>
          <Text style={styles.DeliveryTypeText}>배송 유형</Text>
        </View>
      </View> 

      {/*BoxSize*/}
      <View style={styles.BoxSizeWrapper}>

        <View style={styles.BoxSizeSmallWrapper}>
            <Image style={styles.BoxSizeSmallIcon} source={require('../assets/smallbox.png')}></Image>
            <Text style={styles.BoxSizeSmallTextText}>소</Text>
        </View>

        <View style={styles.BoxSizeMiddleWrapper}>
            <Image style={styles.BoxSizeMiddleIcon} source={require('../assets/midbox.png')}></Image>
            <Text style={styles.BoxSizeMiddleTextText}>중</Text>
        </View>
        <View style={styles.BoxSizeBigWrapper}>
            <Image style={styles.BoxSizeBigIcon} source={require('../assets/bigbox.png')}></Image>
            <Text style={styles.BoxSizeBigTextText}>대</Text>
        </View>
      
      </View>

            
      <View style={styles.RButtonWrapper}>
        <Button style={styles.RButton}
          onPress={() => {
            this.props.navigation.navigate('Menu') }}
          title="배송요청">
        </Button>
      </View>


      

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //
  HeaderWrapper:{
    flexDirection: "row",
    marginTop:30,
  },
  HeaderCircleOne:{
      marginLeft:20,
      marginTop:3,
  },
  HeaderStartPoint:{
    marginLeft:20,
  },
  HeaderStartPointText:{
    fontSize:20,
    fontWeight:'bold',
    color:'black',
  },
  HeaderGPS:{
    alignSelf: "flex-end",
    marginLeft:220,
  },
  //
  FirstLineWrapper:{
    flexDirection: "row",
    marginTop:2,
    marginLeft:7,
  },
  FirstRowLine:{
    marginLeft:22,
  },
  GpsLine:{
    marginLeft:10,
    width:300,
  },
  TextGpsline:{
    marginLeft:15,
    borderBottomColor:'black',
    borderBottomWidth:2,
  },
  ColTextGpsline:{
    //패스
  },
  //
  TwoLineWrapper:{
    flexDirection: "row",
    //marginTop:30,
  },
  TwoLineCircleTWo:{
    marginLeft:21,
    marginTop:5,
  },
  TwoLineDestination:{
    marginLeft:20,
  },
  TwoLineDestinationText:{
    fontSize:20,
    fontWeight:'bold',
    color:'black',
  },
  //
  ThirdLineWrapper:{
    marginRight:88,
    marginLeft:22,
  },
  //
  DeliveryTypeWrapper:{
    marginLeft:23,
    marginTop:20,
  },
  DeliveryTypeText:{
    fontSize:20,
    fontWeight:'bold',
    color:'black',
  },
  //
  BoxSizeWrapper:{
    flexDirection: "row",
    justifyContent:'center',
    marginTop:10,
  },
  BoxSizeSmallWrapper:{
    backgroundColor: "#f6f6f6",
    borderRadius: 15,
    width: 100,
    height: 90,
    margin:10,
  },
  BoxSizeSmallIcon:{
    width: 30,
    height: 30,
    alignSelf: "center", 
    marginTop:20,
  },
  BoxSizeSmallText:{ 

  },
  BoxSizeSmallTextText:{
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: "center",
    marginTop:5,
  },
  BoxSizeMiddleWrapper:{
    backgroundColor: "#f6f6f6",
    borderRadius: 15,
    width: 100,
    height: 90,
    margin:10,
  },
  BoxSizeMiddleIcon:{
    width: 30,
    height: 30,
    alignSelf: "center", 
    marginTop:20,
  },
  BoxSizeMiddleText:{

  },
  BoxSizeMiddleTextText:{
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: "center",
    marginTop:5,
    
  },
  BoxSizeBigWrapper:{
    backgroundColor: "#f6f6f6",
    borderRadius: 15,
    width: 100,
    height: 90,
    margin:10,
   
  },
  BoxSizeBigIcon:{
    width: 30,
    height: 30,
    alignSelf: "center", 
    marginTop:20,
  },
  BoxSizeBigText:{

  },
  BoxSizeBigTextText:{
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: "center",
    marginTop:5,
  },
  RButtonWrapper:{
    marginTop:20,
    alignSelf: "center",  
    width:300,
    
  },
  RButton:{
  
    
  },














});


import React from 'react'

import { View, Text , Image , StyleSheet , Button} from 'react-native'


export default function LoginMenu() {
    return (
    <View style={styles.Header} >
      <Text style={styles.Textone}>바로 배송 가능한 드론 택배 서비스</Text>
      <Text style={styles.Texttwo}>Interceptor</Text>
      <Text style={styles.Textthree}>기존의 복잡한 택배 과정 없이,</Text>
      <Text style={styles.Textfour}>개인정보 유출이 가능한 송장이 필요없이,</Text>
      <Text style={styles.Textfive}>원클릭으로 AI가 알아서 보내주고</Text>
      <Text style={styles.Textsix}>실시간 배송 추적이 가능한 앱</Text>
      <Image 
        source={require('../assets/login.png')}
        style={styles.DroneImage} >
      </Image>
      <Button 
        style={styles.LoginButton}
        
        title="Sign In with Apple" >
      </Button>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
      //backgroundColor: '#fff',
      flex:1,
    },
    Header:{
      marginTop:80,
    },
    Textone:{
      fontSize:20,
      fontWeight:'bold',
      color:'black',
      marginLeft:20,
    },
    Texttwo:{
      fontSize:65,
      fontWeight:'bold',
      color:'black',
      marginLeft:20,
    },
    Textthree:{
      marginTop:5,
      fontSize:17,
      fontWeight:'bold',
      color:'black',
      marginLeft:20,
    },
    Textfour:{
      fontSize:17,
      fontWeight:'bold',
      color:'black',
      marginLeft:20,
      marginTop:5,
    },
    Textfive:{
      fontSize:17,
      fontWeight:'bold',
      color:'black',
      marginLeft:20,
      marginTop:5,
    },
    Textsix:{
      fontSize:17,
      fontWeight:'bold',
      color:'black',
      marginLeft:20,
      marginTop:5,
    },
    DroneImage:{
      alignSelf: "center",
      
    },
    LoginButton:{
      backgroundColor:'black',
    },

});



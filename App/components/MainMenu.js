import React from 'react'
import { render } from 'react-dom';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import ict from '../assets/ict.png';


export default function MainMenu() {
    return (
        <View style={styles.container}>

            <View style={styles.Header}>

            </View>
            <View style={styles.Middle}>
                <Text style={styles.StrName}>Interceptor</Text>
                    <Image style={styles.ictImage} source={ict}/>
                    <Text styel={styles.ictName}>한이음</Text>  
            </View>

            <View style={styles.Footer}>
                
                <View style={styles.innerFooterOne}>
                    <View style={styles.innerOneDelivery}>
                        <Button style={styles.button} title="배송"/>
                    </View>
                    <View style={styles.innerOneHistory}>
                         <Button style={styles.button} title="이력"/>
                    </View>
                </View>
                
                <View style={styles.innerFooterTwo}>
                    <Button style={styles.button} title="실시간 추적"/>
                </View>

                <View style={styles.innertFooterThree}>
                    <View style={styles.innerThreeSetting}>
                        <Button style={styles.button} title="설정"/>
                    </View>
                    <View style={styles.innerThreeMonitor}>
                        <Button style={styles.button} title="모니터링"/>
                    </View>
                </View>
                <View style={styles.Last}>

                </View>


            </View>
        </View>)
}



const styles = StyleSheet.create({
    //전체적인 부분 flex로 나누기
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    Header: {
        flex: 1,
    },

    Middle: {
        flex: 2,
        flexDirection:"column",
    },
    Footer: {
        flex: 6,
    },
    Last:{
        flex:1,
    },
    //

    innerFooterOne:{
        flex:2,
        flexDirection:"row",
    
    },
    innerFooterTwo:{
        flex:2,
        width:400,
        height:100,
        alignContent:"center",
       
    },
    innertFooterThree:{
        flex:2,
        flexDirection:"row",
       
    },
    innerOneDelivery:{
        flex:1,
      
    },
    innerOneHistory:{
        flex:1,
       
    },
    innerThreeSetting:{
        flex:1,
       
    },
    innerThreeMonitor:{
        flex:3,
      
    },



    StrName: {
        color: 'black',
        fontSize: 50,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    ictImage:{
        width:50,
        height:50,  
        marginLeft: 20,
        borderRadius:35,

    },
    ictName:{
        color:'black',
        fontSize:20,
        marginLeft: 20,
        fontWeight:'bold',
    },
    
    button:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        width:'20%',
        height:'30%',

    },

});



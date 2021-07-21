import React , { useState } from 'react'
import {  View, Text, Image, StyleSheet, Button, Switch } from 'react-native'



export default function SettingMenu() {
    
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
    <View style={styles.container}>

        <View style={styles.TitleWrapper}>
            <View style={styles.Title}>
                <Text style={styles.TitleText}>설정</Text>
            </View>
        </View>
        
        <View style={styles.SetMenuWrapper}>
            <View style={styles.ProfileWrapper}>
                <Image 
                    source={require('../assets/ict.png')} 
                    style={styles.Profile} >
                </Image>
                <Text style={styles.ProfileText}>한이음</Text>
            </View>
            {/*흰색선*/}
            <View style={styles.WhiteLineWrapper}>
                <Image 
                    source={require('../assets/rectangle.png')} 
                    style={styles.WhiteLine} >
                </Image>
            </View>
            

            <View style={styles.ProfileImageWrapper}>
                
                <Text style={styles.ProfileImage}>프로필 사진 변경</Text>
                <Image 
                    source={require('../assets/chevron_right.png')} 
                    style={styles.ProfileIcon} >
                </Image>
            </View>
            <View style={styles.ProfileNickNameWrapper}>
                <Text style={styles.ProfileNickName}>닉네임 변경</Text>
                <Image 
                    source={require('../assets/chevron_right.png')} 
                    style={styles.ProfileIcon} >
                </Image>
            </View>
            <View style={styles.ProfilePasswordWrapper}>
                <Text style={styles.ProfilePassword}>비밀번호 변경</Text>
                <Image 
                    source={require('../assets/chevron_right.png')} 
                    style={styles.ProfileIcon} >
                </Image>
            </View>
            <View style={styles.WhiteLineWrapper}>
                <Image 
                    source={require('../assets/rectangle.png')} 
                    style={styles.WhiteLine} >
                </Image>
            </View>

            <View style={styles.DarkWrapper}>
                <Text style={styles.DarkMode}>다크모드</Text>
                <View style={styles.DarkSlide}>
                    <Switch
                        trackColor={{ false: "#e5386d", true: "#e5386d" }} 
                        thumbColor={isEnabled ? "white" : "white"}     
                        ios_backgroundColor="#e5386dre"  
                        onValueChange={toggleSwitch}
                        value={isEnabled} />
                </View>
            </View>

            <Text style={styles.Center}>고객센터</Text>
        </View>

        <View style={styles.BottomHeaderWrapper}>
            <View style={styles.BottomWrapper}>
                <Text style={styles.Logout}>로그아웃</Text>
                <Text style={styles.Read}>개인정보처리방침</Text>
                <Text style={styles.Copyright}>© 2021. Interceptor all rights reserved.</Text>
                <View style={styles.BottomImage}>
                    <Image  
                        source={require('../assets/han1.png')} 
                        style={styles.HanIamge1}>
                    </Image>
                    <Image  
                        source={require('../assets/han2.png')}
                        style={styles.HanIamge2}>
                    </Image>
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
    TitleWrapper:{
        marginTop:20,
    },
    Title:{
        marginTop:20,
        marginLeft:40,
    },
    TitleText:{
        fontSize:50,
        fontWeight:'bold',
        color:'black',
    },
    SetMenuWrapper:{
        backgroundColor:'#f6f6f6',
        width:320,
        height:430,
        alignSelf: "center",
        borderRadius:15,
        marginTop:20,
    },
    ProfileWrapper:{
        flexDirection:"row",
        marginTop:20,
    },
    Profile:{
        width:50,
        height:50,  
        marginLeft: 20,
        borderRadius:35,
    },
    ProfileText:{
        fontSize:18,
        fontWeight:'bold',
        color:'black',
        marginTop:12,
        marginLeft:10,
    },

    ProfileImageWrapper:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:35,
    },

    ProfileNickNameWrapper:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:35,
    },
    ProfilePasswordWrapper:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop:35,
        
    },
    ProfileImage:{
        fontSize:15,
        fontWeight:'bold',
        color:'black',
        marginLeft:40,
    },
    ProfileIcon:{
        marginRight:30,
    },
    ProfileNickName:{
        fontSize:15,
        fontWeight:'bold',
        color:'black',
        marginLeft:40,
    },
    ProfilePassword:{
        fontSize:15,
        fontWeight:'bold',
        color:'black',
        marginLeft:40,
    },

    DarkWrapper:{
        marginTop:30,
        flexDirection:"row",
        justifyContent:"space-between",
    },
    DarkMode:{
        fontSize:15,
        fontWeight:'bold',
        color:'black',
        marginLeft:40,
        
    },
    DarkSlide:{
        marginRight:30,
    },
    Center:{
        fontSize:15,
        fontWeight:'bold',
        color:'black',
        marginLeft:40,
        marginTop:30,
    },
    WhiteLineWrapper:{
        alignSelf: "center",
        marginTop:20,
    },
    WhiteLine:{
      
    },
    BottomHeaderWrapper:{
        //alignSelf: "center",
    },
    BottomWrapper:{
        alignSelf: "center",
        marginTop:10,
    },
    Logout:{
        fontSize:20,
        fontWeight:'bold',
        color:'#e96d65',
        borderBottomColor:'#e96d65',
        borderBottomWidth:1,
        alignSelf: "center",
        marginTop:15,
    },
    Read:{
        fontSize:13,
        fontWeight:'bold',
        color:'gray',
        borderBottomColor:'gray',
        borderBottomWidth:1,
        alignSelf: "center",
        marginTop:15,

    },
    Copyright:{
        fontSize:13,
        fontWeight:'bold',
        color:'gray',
        alignSelf: "center",
        marginTop:15,
    },
    BottomImage:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop:10,
    },
    HanIamge1:{
        margin:10,
    },
    HanIamge2:{
        margin:7,

    },



});



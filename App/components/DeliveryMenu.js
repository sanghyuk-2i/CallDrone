import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity, Image, TextInput, PanResponder } from 'react-native';
import { WebView } from 'react-native-webview';
import Back from './common/Back';
import MapView from './map.html';

export default function DeliveryMenu({ navigation }) {

  useEffect(() => {
    slideUp();
  })

  const viewData = {
    boxIconData: [require("../assets/icon/location/smallbox.png"), require("../assets/icon/location/midbox.png"), require("../assets/icon/location/bigbox.png")],
    boxTextData: ['소', '중', '대'],
    adrTextData: ['출발', '도착']
  }

  const deviceHeight = Dimensions.get('window').height;
  const pan = useRef(new Animated.ValueXY({ x: 0, y: deviceHeight })).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (e, gesture) => {
      if (gesture.moveY >= deviceHeight - 430) {
        pan.setValue({ x: 0, y: gesture.moveY })
      }
    },
    onPanResponderRelease: (e, gesture) => {
      let num = 0;
      (gesture.moveY >= deviceHeight - 200) ? num = 100 : num = 430
      Animated.spring(
        pan,
        { toValue: { x: 0, y: deviceHeight - num }, useNativeDriver: false },
      ).start();
    },
  });

  const slideUp = () => {
    Animated.timing(pan.y, {
      toValue: deviceHeight - 430,
      duration: 500,
      useNativeDriver: false
    }).start();
  }

  return (
    <>
      <StatusBar style='auto' />
      <Back navigation={navigation} css={{ position: 'absolute', zIndex: 99 }} />
      <Animated.View style={[styles.menu, pan.getLayout()]} >
        <Animated.View {...panResponder.panHandlers} style={[styles.viewDrawer]}>
          <View style={styles.drawer}></View>
        </Animated.View>
        <View style={styles.viewLocation}>
          <View style={styles.ltnIcon}>
            <View style={styles.circle}></View>
            <View style={styles.straight}></View>
            <View style={styles.circle}></View>
          </View>
          <View style={styles.ltnAddress}>
            {
              viewData.adrTextData.map((text, i) =>
                <View style={styles.addressCheck} key={i}>
                  <Text style={styles.checkTitle}>{text}</Text>
                  <TextInput style={styles.checkInput} />
                </View>
              )
            }
          </View>
        </View>
        <View style={styles.viewBox}>
          <Text style={styles.boxTitle}>배송 유형</Text>
          <View style={styles.boxSelect}>
            {
              viewData.boxIconData.map((v, i) =>
                <TouchableOpacity style={styles.boxButton} key={i}>
                  <Image style={styles.boxIcon} source={viewData.boxIconData[i]} />
                  <Text style={styles.boxText}>{viewData.boxTextData[i]}</Text>
                </TouchableOpacity>)
            }
          </View>
        </View>
        <TouchableOpacity style={styles.reqButton}><Text style={styles.btnText}>배송 요청</Text></TouchableOpacity>
      </Animated.View>
      <WebView
        style={styles.container}
        originWhitelist={['*']}
        source={MapView} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    zIndex: 1
  },
  menu: {
    display: 'flex',
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: '55%',
    alignItems: 'center',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    zIndex: 99
  },
  viewDrawer: {
    width: '100%',
    height: 40
  },
  drawer: {
    width: 48,
    height: 5,
    backgroundColor: '#E8E8E8',
    borderRadius: 100,
    marginVertical: 14,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  viewLocation: {
    display: 'flex',
    flexDirection: 'row'
  },
  ltnIcon: {
    paddingRight: 28
  },
  circle: {
    borderWidth: 5,
    borderRadius: 50,
    width: 24,
    height: 24
  },
  straight: {
    width: 4,
    height: 50,
    backgroundColor: 'black',
    alignSelf: 'center',
    marginVertical: 4
  },
  ltnAddress: {
    paddingRight: 18
  },
  addressCheck: {

  },
  checkTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 4
  },
  checkInput: {
    width: 260,
    borderBottomWidth: 3,
    borderBottomColor: '#C4C4C4',
    marginVertical: 19.5
  },
  viewBox: {
    paddingBottom: 8
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: '800',
    paddingVertical: 5
  },
  boxSelect: {
    display: 'flex',
    flexDirection: 'row'
  },
  boxButton: {
    width: 100,
    height: 80,
    backgroundColor: '#F6F6F6',
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  boxIcon: {
    width: 30,
    height: 30
  },
  boxText: {
    fontSize: 14,
    fontWeight: '800'
  },
  reqButton: {
    width: '90%',
    height: '13%',
    backgroundColor: '#1A1A1A',
    borderRadius: 100,
    justifyContent: 'center',
    marginTop: 8
  },
  btnText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600'
  }
});

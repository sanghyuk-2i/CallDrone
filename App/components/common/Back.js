import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from '../../assets/left.png';

export default function Back({ navigation, css }) {
    return (
        <TouchableOpacity style={[styles.back, css]} onPress={() => navigation.goBack()}>
            <Image style={styles.backImage} source={Icon} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    back: {
        width: 40,
        height: 40,
        top: '7%',
        left: '3%',
        backgroundColor: 'black',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backImage: {
        width: 15,
        height: 15,
        marginRight: 2
    },
})
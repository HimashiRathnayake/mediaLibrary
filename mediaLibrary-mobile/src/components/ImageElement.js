import React from 'react';
import {Image, Text, View, StyleSheet, Dimensions} from 'react-native';

export const ImageElement = ({src}) => {
    return(
        <Image source={src} style={styles.image}/>
    );
}

export const OriginalImageElement = ({src}) => {
    return(
        <Image source={src} style={styles.originalImage}/>
    );
}

const styles=StyleSheet.create({
    image:{
        flex: 1,
        alignSelf: 'stretch',
        resizeMode: 'cover',
        height: 110,
        width: 110,
        borderRadius: 10,
    },
    originalImage:{
        alignSelf: 'stretch',
        resizeMode: 'center',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height

    }
});
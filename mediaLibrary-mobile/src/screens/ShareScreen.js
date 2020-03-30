import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import {Header} from '../commons/Header';
import {styles} from '../styles/commons';

export const ShareScreen = ({route,navigation}) => {
    const type=route.params.type;
    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <Header navigation={navigation}>Shared {type}s</Header>
        </ImageBackground>
    );
}
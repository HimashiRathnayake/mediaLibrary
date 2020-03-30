import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import {styles} from '../styles/commons';
import {Header} from '../commons/Header';

export const AudioScreen = ({navigation}) => (
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
        <Header navigation={navigation}>Audio</Header>
    </ImageBackground>
);
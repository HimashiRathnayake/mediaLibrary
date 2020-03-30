import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import {styles} from '../styles/commons';
import {Header} from '../commons/Header';

export const ImageScreen = ({navigation}) => (
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
        <Header navigation={navigation}>Image</Header>
    </ImageBackground>
);
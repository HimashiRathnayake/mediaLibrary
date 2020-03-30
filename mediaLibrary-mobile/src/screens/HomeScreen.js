import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import {Header} from '../commons/Header';
import {styles} from '../styles/commons';

export const HomeScreen = ({navigation}) => (
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
        <Header navigation={navigation}>Home</Header>
    </ImageBackground>
);
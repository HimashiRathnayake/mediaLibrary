import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {styles} from '../styles/commons';
import {Header} from '../commons/Header';

export const VideoScreen = ({navigation}) => (
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
        <Header navigation={navigation}>Video</Header>
    </ImageBackground>
);
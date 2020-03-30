import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {styles} from '../styles/commons';
import {Header} from '../commons/Header';

export const FavouritesScreen = ({navigation}) => (
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
        <Header navigation={navigation}>MyFavourites</Header>
    </ImageBackground>
);
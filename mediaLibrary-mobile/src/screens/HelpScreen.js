import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import {Header} from '../commons/Header';
import {styles} from '../styles/commons';

export const HelpScreen = ({route,navigation}) => {
    return(
        <View style={styles.backgroundImage}>
            <Header navigation={navigation}>Help & Feedback</Header>
        </View>
    );
}
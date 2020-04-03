import React from 'react';
import {ImageBackground, Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Header} from '../commons/Header';
import {styles} from '../styles/commons';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { MediaButton } from '../commons/MediaButton';

export const HomeScreen = ({navigation}) => (
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
        <Header navigation={navigation}>Home</Header>

        <View style={styleHome.headerContainer}>
                <Entypo name="folder-video" color="white" size={40} /> 
                <Text style={styleHome.headerText}>Welcome to MyMedia</Text>
        </View>

        <View style={styleHome.container}>
            <Text style={styleHome.containerHeader}>Store Your All Multimedia Files, Share & Manage Them at One Place</Text>
            <MediaButton type='Image' onPress={()=>{navigation.navigate('Images')}}>Images</MediaButton>
            <MediaButton type='Audio' onPress={()=>{navigation.navigate('Audios')}}>Audios</MediaButton>
            <MediaButton type='Video' onPress={()=>{navigation.navigate('Videos')}}>Videos</MediaButton>
        </View>
    </ImageBackground>
);

const styleHome = StyleSheet.create({
    container: {
        alignContent: 'center',
        height: 500
    },
    containerHeader:{
        marginLeft: 10,
        marginTop: 10,
        fontSize: 18,
        marginBottom: 60
    },
    headerContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        fontSize: 26
    },
});
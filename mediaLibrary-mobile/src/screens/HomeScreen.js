import React from 'react';
import {ImageBackground, Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Header} from '../commons/Header';
import {styles} from '../styles/commons';
import { FontAwesome, Entypo } from '@expo/vector-icons';

export const HomeScreen = ({navigation}) => (
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
        <Header navigation={navigation}>Home</Header>
        <View style={styleHome.container}>
            <Text style={styleHome.containerHeader}>Store Your All Multimedia Files & Manage Them at one place</Text>
            <TouchableOpacity style={styleHome.card} onPress={()=>{navigation.navigate('Image')}}>
                <Entypo name="folder-images" style={styleHome.type}/> 
                <Text style={styleHome.text}>Images</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styleHome.card} onPress={()=>{navigation.navigate('Audio')}}>
                <Entypo name="folder-music" style={styleHome.type}/>  
                <Text style={styleHome.text}>Audios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styleHome.card} onPress={()=>{navigation.navigate('Video')}}>
                <Entypo name="folder-video" style={styleHome.type}/>  
                <Text style={styleHome.text}>Videos</Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>
);

const styleHome = StyleSheet.create({
    card: {
        width: Dimensions.get('screen').width - 100,
        marginVertical: 20,
        marginLeft: 80,
        alignItems: 'center',
        flexDirection: 'row'        
    },
    container: {
        alignContent: 'center'
    },
    text:{
        fontSize: 24,
        alignSelf: 'center',
        color: '#9e9e9e',
        marginLeft: 20
    },
    containerHeader:{
        marginLeft: 10,
        marginTop: 40,
        fontSize: 18
    },
    type: {
        backgroundColor:"transparent",
        color:"#9e9e9e",
        fontSize:100
    }
});
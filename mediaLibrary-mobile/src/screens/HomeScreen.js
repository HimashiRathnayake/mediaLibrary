import React, { useState } from 'react';
import {ImageBackground, Text, View, StyleSheet, Dimensions, TouchableOpacity, Modal, Picker} from 'react-native';
import {HomeHeader} from '../commons/Header';
import {styles} from '../styles/commons';
import { Entypo } from '@expo/vector-icons';
import { MediaButton } from '../commons/MediaButton';
import {HomeSearch} from '../modals/HomeSearch';

export const HomeScreen = ({navigation}) => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState('Image');
    
    return (
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <HomeHeader navigation={navigation} setVisible={setVisible} selected={selected}>Home</HomeHeader>
            <View style={styleHome.headerContainer}>
                    <Entypo name="folder-video" color="white" size={40} /> 
                    <Text style={styleHome.headerText}>Welcome to MyMedia</Text>
            </View>

            <View style={styleHome.container}>
                {/* <Text style={styleHome.containerHeader}>Store Your All Multimedia Files,</Text>
                <Text style={styleHome.containerHeader}>Share & Manage Them at One Place</Text> */}
                <MediaButton type='Image' onPress={()=>{navigation.navigate('Images')}}>Images</MediaButton>
                <MediaButton type='Audio' onPress={()=>{navigation.navigate('Audios')}}>Audios</MediaButton>
                <MediaButton type='Video' onPress={()=>{navigation.navigate('Videos')}}>Videos</MediaButton>
            </View>
            <HomeSearch visible={visible} setVisible={setVisible}/>
        </ImageBackground>
    );
}

const styleHome = StyleSheet.create({
    container: {
        alignContent: 'center',
        flex: 2
    },
    containerHeader:{
        marginLeft: 10,
        marginTop: 10,
        fontSize: 18,
        marginBottom: 60,
        alignSelf: 'center'
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        fontSize: 26
    },
    searchView:{
        marginTop: 20,
        flexDirection:'row',
        alignSelf: 'center',
    },
    criteria: {
        fontSize: 14,
        width: Dimensions.get('screen').width/3 - 30,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        marginHorizontal: 10,
        textAlign: 'center' 
    }
});
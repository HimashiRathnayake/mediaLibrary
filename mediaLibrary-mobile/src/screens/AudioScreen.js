import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import {styles} from '../styles/commons';
import {FileHeader} from '../commons/Header';

export const AudioScreen = ({navigation, routes}) => {
    React.useEffect(()=>{
        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible:false,
        });
        return()=>
            parent.setOptions({
                tabBarVisible: true
            })
    },[]);
    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <FileHeader navigation={navigation}>Files</FileHeader>
        </ImageBackground>
    );
}
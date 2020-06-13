import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import { ImageBackground, Image, View, Dimensions } from 'react-native';
import {styles} from '../styles/loginscreen';
import { Entypo } from '@expo/vector-icons';

export const SplashScreen = ({navigation}) => (
    <Box f={1} center>
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <View style={{alignSelf:'center', marginTop:Dimensions.get('screen').height/3}}>
                <Image source={require('../../assets/logo.png')}/>    
                <Text center mt={0} size={40} color='white'>MyMedia</Text>
                <Text center size={14} color='#9e9e9e'>Manage Your All Media Files</Text>
            </View>
        </ImageBackground>
    </Box>
);


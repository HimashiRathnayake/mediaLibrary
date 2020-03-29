import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import { ImageBackground } from 'react-native';
import {styles} from '../styles/loginscreen';
import { Entypo } from '@expo/vector-icons';

export const SplashScreen = ({navigation}) => (
    <Box f={1} center>
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <Box center mt={250}>
                <Entypo name="folder-video" color="white" size={100} />    
                <Text center mt={20} size={40} color='white'>Media Library</Text>
            </Box>
        </ImageBackground>
    </Box>
);


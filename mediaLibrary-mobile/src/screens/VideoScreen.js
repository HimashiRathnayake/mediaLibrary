import React, { useState } from 'react';
import {ImageBackground, Button} from 'react-native';
import {styles} from '../styles/commons';
import {Header} from '../commons/Header';
import { VideoModal } from '../modals/VideoModal';

export const VideoScreen = ({navigation}) => {

    const [visible, setVisible] = useState(false);

    return(
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
        <Header navigation={navigation}>Video</Header>
        <Button title='click' onPress={()=>setVisible(true)}/>
        <VideoModal visible={visible} setVisible={setVisible}/>
    </ImageBackground>
    );
}


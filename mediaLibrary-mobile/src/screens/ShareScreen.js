import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import {Header} from '../commons/Header';
import {styles} from '../styles/commons';
import {getSharedFiles} from '../api/share';
import { ImageDisplayer } from '../commons/ImageDisplayer';
import { AudioDisplayer } from '../commons/AudioDisplayer';
import { VideoDisplayer } from '../commons/VideoDisplayer';

export const ShareScreen = ({route,navigation}) => {
    const [files, setFiles] = React.useState([]);
    const [count, setCount] = React.useState(null);
    const [refresh, setRefresh] = React.useState(false);

    React.useEffect(()=>{  
        navigation.addListener('focus', ()=>{
            setRefresh(true);
        });
        getSharedFiles(type)
        .then((response)=>{
            setCount(response.length);
            setFiles(response); 
        })
        .catch((error)=>{
            console.log(error)
        })
        setRefresh(false);
    },[refresh])

    const type=route.params.type;
    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage} accessibilityLabel='shareScreen'>
            <Header navigation={navigation}>Shared {type}s</Header>
            <View flex={1}>
                {type==='Image' && <ImageDisplayer setRefresh={setRefresh} images={files} count={count} type='shared'/>}
                {type==='Audio'&& <AudioDisplayer setRefresh={setRefresh} audios={files} count={count} type='shared'/>}
                {type==='Video'&&   <VideoDisplayer setRefresh={setRefresh} videos={files} count={count} type='shared'/>}
            </View>
        </ImageBackground>
    );
}
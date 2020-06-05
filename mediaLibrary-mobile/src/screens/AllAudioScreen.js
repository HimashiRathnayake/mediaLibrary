import React, {useState} from 'react';
import {ImageBackground} from 'react-native';
import {styles} from '../styles/commons';
import {Header} from '../commons/Header';
import { getAudios } from '../api/audio';
import { AudioDisplayer } from '../commons/AudioDisplayer';

export const AllAudioScreen = ({navigation, route}) => {
    const [audios, setAudios] = useState([]);
    const [count, setCount] = useState(null);
    const [refresh, setRefresh] = useState(false);
    
    React.useEffect(()=>{  
        navigation.addListener('focus', ()=>{
            setRefresh(true);
        });
        setRefresh(false);
        getAudios()
        .then((response)=>{
            setCount(response.count);
            setAudios(response.Audios);
        })
        .catch((error)=>{
            console.log(error)
        })
    },[refresh])

    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage} accessibilityLabel='allAudioScreen'>
            <Header navigation={navigation}>Audio</Header>
            <AudioDisplayer setRefresh={setRefresh} audios={audios} count={count}/>
        </ImageBackground>
    );
}



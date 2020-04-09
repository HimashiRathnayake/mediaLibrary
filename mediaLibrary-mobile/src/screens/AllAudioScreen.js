import React, {useState, useContext} from 'react';
import {ImageBackground, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from '../styles/commons';
import {Header} from '../commons/Header';
import { AuthContext } from '../navigators/context';
import { getAudios } from '../api/audio';
import { AudioModal } from '../modals/AudioModal';
import {styleAudio} from '../styles/audioStyles';

export const AllAudioScreen = ({navigation, route}) => {
    const [audioModal, setAudioModal] = useState(null);
    const [visible, setVisible] = useState(false);
    const {authContext,state} = useContext(AuthContext); 
    const [audios, setAudios] = useState([]);
    const [count, setCount] = useState(null);
    
    React.useEffect(()=>{  
        navigation.addListener('focus', ()=>{
            getAudios({token:state.userToken})
            .then((response)=>{
                setCount(response.count);
                setAudios(response.Audios);
            })
            .catch((error)=>{
                console.log(error)
            })
        })
    },[navigation])

    async function openModal(visible,key){
        await setAudioModal(audios[key]);
        setVisible(visible);
    }

    const audioSet = audios.map((val,key)=>{
        return(
            <TouchableOpacity key={key} onPress={()=>{openModal(true, key)}}>
                <View style={styleAudio.audioContainer}>
                    <Text style={styleAudio.audioName}>{val.audioName.substring(0, 45)}</Text>
                </View>
            </TouchableOpacity>
        )
    })
    
    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <Header navigation={navigation}>Audio</Header>
            {count===0 ? 
                (<View style={styleAudio.noAudioContainer}>
                    <Text style={styleAudio.noAudioText}>No Audios found</Text>
                </View>):
                (<ScrollView style={styleAudio.container}>
                    <View style={styleAudio.container}>
                        {(audioModal !== null) && (
                        <AudioModal visible={visible} setVisible={setVisible} audio={audioModal}/>
                        )}
                        {audioSet}
                    </View>
                </ScrollView>)
            }
        </ImageBackground>
    );
}



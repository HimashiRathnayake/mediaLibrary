import React, {useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { AudioModal } from '../modals/AudioModal';
import {styleAudio} from '../styles/audioStyles';
import { MaterialIcons } from '@expo/vector-icons';

export const AudioDisplayer = ({setRefresh, audios, count}) => {
    const [audioModal, setAudioModal] = useState(null);
    const [visible, setVisible] = useState(false);
    
    async function openModal(visible,key){
        await setAudioModal(audios[key]);
        setVisible(visible);
    }

    const audioSet = audios.map((val,key)=>{
        return(
            <TouchableOpacity key={key} onPress={()=>{openModal(true, key)}}>
                <View style={styleAudio.audioContainer}>
                    <MaterialIcons name='music-video' style={styleAudio.audioIcon}/>
                    <Text style={styleAudio.audioName}>{val.audioName.substring(0, 32)}</Text>
                </View>
            </TouchableOpacity>
        )
    })
    
    return(
        <View>
            {count===0 ? 
                (<View style={styleAudio.noAudioContainer}>
                    <Text style={styleAudio.noAudioText}>No Audios found</Text>
                </View>):
                (<ScrollView style={styleAudio.container}>
                    <View style={styleAudio.container}>
                        {(audioModal !== null) && (
                        <AudioModal visible={visible} setVisible={setVisible} audio={audioModal} setRefresh={setRefresh}/>
                        )}
                        {audioSet}
                    </View>
                </ScrollView>)
            }
        </View>    
    );
}



import React, {useState} from 'react';
import {ImageBackground, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {styles} from '../styles/commons';
import {FileHeader} from '../commons/Header';
import { AuthContext } from '../navigators/context';
import {uploadAudio, getAudiosInFolder} from '../api/audio';
import * as DocumentPicker from 'expo-document-picker';
import {styleAudio} from '../styles/audioStyles';

export const AudioScreen = ({navigation, route}) => {

    const [audioModal, setAudioModal] = useState(null);
    const [visible, setVisible] = useState(false);
    const [audios, setAudios] = useState([]);
    const [count, setCount] = useState(null);
    const [refresh,setRefresh] = useState(false);
    const {authContext,state} = React.useContext(AuthContext); 

    React.useEffect(()=>{
        getAudiosInFolder({token:state.userToken, folderId:route.params.folderId})
        .then((response)=>{
            setCount(response.count);
            setAudios(response.audios);
        })
        .catch((error)=>{
            console.log(error)
        });
        setRefresh(false);
        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible:false,
        });
        return()=>
            parent.setOptions({
                tabBarVisible: true
        });
    },[refresh]);
    
    function openModal(visible,key){
        setAudioModal(audios[key]);
        setVisible(visible);
    }

    let openAudioPickerAsync = async () => {
    
        let pickerResult = await DocumentPicker.getDocumentAsync({type: 'audio/*', copyToCacheDirectory:false});
        console.log(pickerResult)
        if (pickerResult.type === "success"){
            let response = await uploadAudio({folderId:route.params.folderId, uri:pickerResult.uri, token:state.userToken, name:pickerResult.name})
                console.log(response)
                if (response.message == "Audio uploaded successfully"){
                    setRefresh(true);
                }
                else{alert('Something went wrong')}
        }
    }
    
    const audioSet = audios.map((val,key)=>{
        return(
            <View>
            <TouchableOpacity key={key} onPress={()=>{openModal(true, key)}}>
                <View style={styleAudio.audioContainer}>
                    <Text style={styleAudio.audioName}>{val.audioName.substring(0, 45)}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity >
            <View style={styleAudio.audioContainer}>
                <Text style={styleAudio.audioName}>{val.audioName.substring(0, 45)}</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity >
        <View style={styleAudio.audioContainer}>
            <Text style={styleAudio.audioName}>{val.audioName.substring(0, 45)}</Text>
        </View>
    </TouchableOpacity>
    <TouchableOpacity>
    <View style={styleAudio.audioContainer}>
        <Text style={styleAudio.audioName}>{val.audioName.substring(0, 45)}</Text>
    </View>
</TouchableOpacity>
<TouchableOpacity >
                <View style={styleAudio.audioContainer}>
                    <Text style={styleAudio.audioName}>{val.audioName.substring(0, 45)}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity >
            <View style={styleAudio.audioContainer}>
                <Text style={styleAudio.audioName}>{val.audioName.substring(0, 45)}</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity >
        <View style={styleAudio.audioContainer}>
            <Text style={styleAudio.audioName}>{val.audioName.substring(0, 45)}</Text>
        </View>
    </TouchableOpacity>
    <TouchableOpacity >
    <View style={styleAudio.audioContainer}>
        <Text style={styleAudio.audioName}>{val.audioName.substring(0, 45)}</Text>
    </View>
</TouchableOpacity>
</View>
        )
    })

    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <FileHeader navigation={navigation} route={route}/>
            {count===0 ? 
                (
                <View style={styleAudio.noAudioContainer}>
                    <Text style={styleAudio.noAudioText}>No audios found</Text>
                </View>
                ):
                (<View style={styleAudio.scrollContainer}>
                    <ScrollView style={styleAudio.container}>
                        <View style={styleAudio.container}>
                            {(audioModal !== null) && (
                                <AudioModal visible={visible} setVisible={setVisible} audio={audioModal}/>
                            )} 
                            {audioSet}
                        </View>
                    </ScrollView>
                </View>
                )
                }
                <TouchableOpacity onPress={()=>{openAudioPickerAsync()}}>
                    <View>
                        <MaterialIcons name='add-circle-outline' style={styleAudio.addAudioIcon}/>
                    </View>
                </TouchableOpacity>
        </ImageBackground>       
    )
}

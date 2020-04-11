import React, {useState} from 'react';
import {ImageBackground, Text, View, TouchableOpacity} from 'react-native';
import {styles} from '../styles/commons';
import {FileHeader} from '../commons/Header';
import { AuthContext } from '../navigators/context';
import {uploadAudio, getAudiosInFolder} from '../api/audio';
import * as DocumentPicker from 'expo-document-picker';
import {styleAudio} from '../styles/audioStyles';
import { AudioDisplayer } from '../commons/AudioDisplayer';
import { ProgressModal } from '../modals/ProgressModal';

export const AudioScreen = ({navigation, route}) => {

    const [audios, setAudios] = useState([]);
    const [count, setCount] = useState(null);
    const [progressBar, showProgress] = useState(false);
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
    
    let openAudioPickerAsync = async () => {
    
        let pickerResult = await DocumentPicker.getDocumentAsync({type: 'audio/*', copyToCacheDirectory:false});
        console.log(pickerResult)
        if (pickerResult.type === "success"){
            showProgress(true);
            let response = await uploadAudio({folderId:route.params.folderId, uri:pickerResult.uri, token:state.userToken, name:pickerResult.name})
            console.log(response)
            if (response.message == "Audio uploaded successfully"){
                setRefresh(true);
                showProgress(false);
            }
            else{
                showProgress(false);
                alert('Something went wrong')
            }
        }
    }
    
    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <FileHeader navigation={navigation} route={route}/>
            <View>
                <AudioDisplayer count={count} setRefresh={setRefresh} audios={audios}/>
                <View style={styleAudio.iconContainer}>
                    <TouchableOpacity onPress={()=>{openAudioPickerAsync()}}>
                        <Text style={styleAudio.addAudioIcon}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ProgressModal type='Uploading Audio' visible={progressBar}/>
        </ImageBackground>       
    )
}

import React, {useState} from 'react';
import {Text, View, Modal, TouchableOpacity, Alert, Image, Dimensions} from 'react-native';
import {Slider} from 'react-native-elements';
import {Audio} from 'expo-av';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import {stylesScreen} from '../styles/modals/audio';
import {deleteAudio, renameAudio} from '../api/audio';
import { DetailsModal } from './DetailsModal';

const DISABLED_OPACITY = 0.6;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "... buffering ...";
const imageSet = [
    require('../../assets/audio.jpg'),
    require('../../assets/audio2.jpg'),
    require('../../assets/audio3.jpg'),
    require('../../assets/audio4.png'),
    require('../../assets/audio5.jpg'),
    require('../../assets/audio1.jpg')
];

export const AudioModal = ({audio, index, visible, setVisible, openModal, setRefresh}) => {

    const [playbackInstance, setInstance] = useState(null); 
    const [isSeeking, setSeeking] = useState(false);
    const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] = useState(false);
    const [isMuted, setMute]= useState(false);
    const [playbackInstancePosition, setPosition]= useState(null);
    const [playbackInstanceDuration, setDuration]= useState(null);
    const [shouldPlay, setShouldPlay]= useState(false);
    const [isPlaying, setIsPlaying]= useState(false);
    const [isBuffering, setBuffering]= useState(false);
    const [isLoading, setLoading]= useState(true);
    const [detailsModal, setDetailsModal] = useState(false);

    function deleteaudio(audioId){
        setVisible(false);
        deleteAudio({audioId: audioId})
        .then((response)=>{
            console.log(response);
            setRefresh(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    function renameaudio(audioId,name){
        renameAudio({audioId: audioId, name:name})
        .then((response)=>{
            setRefresh(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    
    async function loadNewPlaybackInstance(playing){
        if (playbackInstance != null) {
            await playbackInstance.unloadAsync();
            setInstance(null);
        }
        const source = { uri:audio.path };
        const initialStatus = {shouldPlay: false, rate: 1.0, volume: 1.0, isMuted: isMuted, isLooping: true};
        const {sound, status } = await Audio.Sound.createAsync(
              source,
              initialStatus,
              onPlaybackStatusUpdate
            );
        setInstance(sound);
        updateScreenForLoading(false);
    }

    function onPlaybackStatusUpdate (status){
        if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis);
            setShouldPlay(status.shouldPlay);
            setIsPlaying(status.isPlaying);
            setBuffering(status.isBuffering);
            setMute(status.isMuted);
            if (status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`);
            }
    }}

    
    function getSeekSliderPosition(){
        if (playbackInstance != null && playbackInstancePosition != null && playbackInstanceDuration != null) {
            return (playbackInstancePosition / playbackInstanceDuration);
          }
          return 0;
    }

    function onSeekSliderValueChange (value){
        if (playbackInstance != null && !isSeeking) {
          setSeeking(true);
          setShouldPlayAtEndOfSeek(shouldPlay);
        }
    };

    async function onSeekSliderSlidingComplete(value) {
        if (playbackInstance != null) {
            setSeeking(false);
            const seekPosition = value * playbackInstanceDuration;
            playbackInstance.playFromPositionAsync(seekPosition);
          }
    };

    function getTimeStamp(){
        if (playbackInstance != null && playbackInstancePosition != null && playbackInstanceDuration != null) {
            return `${getMMSSFromMillis(playbackInstancePosition)} / ${getMMSSFromMillis(playbackInstanceDuration)}`;
          }
          return "";
    }

    function getMMSSFromMillis(millis) {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);
    
        const padWithZero = number => {
          const string = number.toString();
          if (number < 10) {
            return "0" + string;
          }
          return string;
        };
        return padWithZero(minutes) + ":" + padWithZero(seconds);
    }

    function onMutePressed(){
        if (playbackInstance != null) {
            playbackInstance.setIsMutedAsync(!isMuted);
        }
    }

    function onStopPressed(){
        if (playbackInstance != null) {
            playbackInstance.stopAsync();
        }
    }

    function stopPlaying(){
        if (playbackInstance != null) {
            playbackInstance.pauseAsync();
        }
        setRefresh(true);
        setInstance(null);
        updateScreenForLoading(true);
        setVisible(false);
    }

    function onPlayPausePressed(){
        if (playbackInstance != null) {
            if (isPlaying) {
              playbackInstance.pauseAsync();
            } else {
              playbackInstance.playAsync();
            }
        }
    }

    function updateScreenForLoading(isLoading){
        if (isLoading) {
            setIsPlaying(false);
            setDuration(null);
            setPosition(null);
            setLoading(true);
        } else {
            setLoading(false)  
        }
    }

    function backPressed(){
        setVisible(false);
        openModal(true, index-1)
    }

    function forwardPressed(){
        setVisible(false);
        openModal(true, index+1);
    }

    React.useEffect(()=>{
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false
        });
        loadNewPlaybackInstance(false);
    },[audio]);

    return(
        <View>
        <Modal style={stylesScreen.modal} transparent={true} animationType='slide' visible={visible} onRequestClose={()=>{stopPlaying()}}>
            <View style={stylesScreen.modal}>
                <View style={[stylesScreen.modalView, {opacity: isLoading ? DISABLED_OPACITY : 1.0}]}>
                    <TouchableOpacity onPress={()=>{stopPlaying()}} style={{flexDirection:'row-reverse', marginLeft: 20, marginTop: 20, position: 'absolute'}}>
                        <Ionicons name='md-arrow-back' style={stylesScreen.icon}/>  
                    </TouchableOpacity>
                    <View flexDirection='row' marginTop={20} marginLeft={Dimensions.get('screen').width-100} flexDirection='row-reverse' position='absolute'>
                        <MaterialCommunityIcons name='delete-outline' style={stylesScreen.iconTop} 
                            onPress={()=>{ 
                                Alert.alert('Do you want to delete audio','',[
                                    {text: 'Cancel'},
                                    {text: "Yes", onPress: ()=>deleteaudio(audio._id)}
                            ],{cancelable:false})}}                        
                        />
                        <MaterialIcons name='favorite-border' style={stylesScreen.iconTop} onPress={()=>setVisible(false)}/>
                    </View> 
                    <View style={{ alignItems: "center", marginTop: 24 }}>
                        <Text style={stylesScreen.headerTop}>MyMedia Audio</Text>
                        <Text style={stylesScreen.header}>{audio.audioName.substring(0,25)}</Text>
                    </View>

                    <View style={stylesScreen.coverContainer}>
                        <Image source={imageSet[index]} style={stylesScreen.image}/>
                    </View>

                    <View style={{ alignItems: "center", marginTop: 22 }}>
                        <Text style={stylesScreen.title}>{audio.title}</Text>
                        <Text style={stylesScreen.artist}>{audio.artist}</Text>
                    </View>

                    <View style={stylesScreen.audioController} >
                        <Slider style={stylesScreen.audioSlider} 
                                value={getSeekSliderPosition()}
                                onValueChange={onSeekSliderValueChange()}
                                onSlidingComplete={onSeekSliderSlidingComplete}
                                disabled={isLoading}
                                trackStyle={stylesScreen.track}
                                thumbStyle={stylesScreen.thumb}
                                minimumTrackTintColor="#93A8B3"
                                />
                        <View style={stylesScreen.audioTextContainer}>
                            <Text style={stylesScreen.audioText}>{getTimeStamp()}</Text>
                            <Text style={stylesScreen.audioText}>{isBuffering ? BUFFERING_STRING : ""}</Text>
                        </View>
                    </View>
                
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                        <TouchableOpacity onPress={()=>backPressed()}>
                            <FontAwesome5 name="backward" size={32} color="#93A8B3"></FontAwesome5>
                        </TouchableOpacity>
                        <TouchableOpacity style={stylesScreen.playButtonContainer} disabled={isLoading} onPress={()=>onPlayPausePressed()}>
                            <FontAwesome5
                                name = {isPlaying? 'pause' :'play'}
                                size={32}
                                color="#3D425C"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>forwardPressed()}>
                            <FontAwesome5 name="forward" size={32} color="#93A8B3"></FontAwesome5>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={stylesScreen.bottom}>
                        <TouchableOpacity onPress={()=>setDetailsModal(true)}>
                            <View flexDirection='row'>
                                <Text style={[stylesScreen.bottomText, {marginRight:10}]}>View & edit Details</Text>
                                <AntDesign name='caretdown' style={stylesScreen.bottomText}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

        <DetailsModal 
            file={audio} 
            type='Audio' 
            detailsModal={detailsModal} 
            setDetailsModal={setDetailsModal} 
            renameFile={renameaudio} 
            setRefresh={setRefresh}
        />
        
        </View>
);
}
import React, {useState} from 'react';
import {Text, View, Modal, TouchableOpacity, Slider} from 'react-native';
import {Audio} from 'expo-av';
import { Foundation, Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import {stylesScreen} from '../styles/modals/audio';

const DISABLED_OPACITY = 0.6;
const LOADING_STRING = "... loading ...";
const BUFFERING_STRING = "... buffering ...";

export const AudioModal = ({audio, visible, setVisible}) => {

    const [playbackInstance, setInstance] = useState(null); 
    const [isSeeking, setSeeking] = useState(false);
    const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] = useState(false);
    const [audioName, setName] = useState(LOADING_STRING);
    const [isMuted, setMute]= useState(false);
    const [playbackInstancePosition, setPosition]= useState(null);
    const [playbackInstanceDuration, setDuration]= useState(null);
    const [shouldPlay, setShouldPlay]= useState(false);
    const [isPlaying, setIsPlaying]= useState(false);
    const [isBuffering, setBuffering]= useState(false);
    const [isLoading, setLoading]= useState(true);
    
    async function loadNewPlaybackInstance(playing){
        console.log(audio)
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
            playbackInstance.stopAsync();
        }
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
            setName(LOADING_STRING);
            setDuration(null);
            setPosition(null);
            setLoading(true);
        } else {
            setName(audio.audioName);  
            setLoading(false)  
        }
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
        <Modal style={stylesScreen.modal} transparent={true} animationType='fade' visible={visible} onRequestClose={()=>{}}>
            <View style={stylesScreen.modal}>
                <View style={[stylesScreen.modalView, {opacity: isLoading ? DISABLED_OPACITY : 1.0}]}>
                    <TouchableOpacity onPress={()=>{stopPlaying()}} style={{flexDirection:'row-reverse', marginLeft: 10, marginTop: 10}}>
                        <MaterialCommunityIcons name='close-box' style={stylesScreen.icon}/>  
                    </TouchableOpacity>
                    <Text style={stylesScreen.header}>{audioName}</Text>
                    <View style={stylesScreen.audioController} >
                        <Slider style={stylesScreen.audioSlider} 
                                value={getSeekSliderPosition()}
                                onValueChange={onSeekSliderValueChange()}
                                onSlidingComplete={onSeekSliderSlidingComplete}
                                disabled={isLoading}
                                />
                        <View style={stylesScreen.audioTextContainer}>
                            <Text style={stylesScreen.audioText}>{getTimeStamp()}</Text>
                            <Text style={stylesScreen.audioText}>{isBuffering ? BUFFERING_STRING : ""}</Text>
                        </View>
                    </View>
                    <View style={stylesScreen.mainController}>
                        <TouchableOpacity disabled={isLoading} onPress={()=>onPlayPausePressed()}><FontAwesome name={isPlaying? 'pause' :'play'} style={stylesScreen.icon}/></TouchableOpacity> 
                        <TouchableOpacity disabled={isLoading} onPress={()=>onStopPressed()}><Foundation name='stop' style={stylesScreen.icon}/></TouchableOpacity>
                        <TouchableOpacity disabled={isLoading} onPress={()=>onMutePressed()}><Ionicons name={isMuted?'md-volume-off':'md-volume-high'} style={stylesScreen.icon}/></TouchableOpacity> 

                    </View>
                
                    
                    <View flexDirection='row' marginTop={50} marginLeft={30} flexDirection='row-reverse'>
                        <MaterialCommunityIcons name='delete-outline' style={stylesScreen.iconBottom} onPress={()=>setVisible(false)}/>
                        <MaterialIcons name='favorite-border' style={stylesScreen.iconBottom} onPress={()=>setVisible(false)}/>
                        <Ionicons name='md-share' style={stylesScreen.iconBottom} onPress={()=>setVisible(false)}/>
                    </View>    
                    <View style={stylesScreen.bottomView}>
                        <Text style={{fontWeight: 'bold', fontSize:20}}>Details: </Text>
                        <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Title :</Text><Text style={stylesScreen.detailTextRight}>{audio.title}</Text></View>
                        <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Album :</Text><Text style={stylesScreen.detailTextRight}>{audio.album}</Text></View>
                        <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Artist :</Text><Text style={stylesScreen.detailTextRight}>{audio.artist}</Text></View>
                        <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Year :</Text><Text style={stylesScreen.detailTextRight}>{audio.year}</Text></View>
                    </View>
                </View>
            </View>
        </Modal>
);
}
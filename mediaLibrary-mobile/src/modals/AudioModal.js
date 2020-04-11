import React, {useState} from 'react';
import {Text, View, Modal, StyleSheet, Dimensions, TouchableOpacity, Slider} from 'react-native';
import {Audio} from 'expo-av';
import { Foundation, Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

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

const stylesScreen = StyleSheet.create({
    modal: {
        flex:1,
        padding: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
        height: Dimensions.get('screen').height - 100,
        marginTop: 50,
        alignSelf: 'center',
        backgroundColor: 'white',
        width: Dimensions.get('screen').width-40,
        borderRadius: 20,
        marginTop: 40

    },
    input: {
        width: Dimensions.get('screen').width-80,
        alignSelf: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    header:{
        marginTop: 0,
        marginLeft: 20,
        marginBottom: 40,
        fontSize: 18,
        fontWeight: 'bold'
    },
    mainController:{
        top: 40,
        width: Dimensions.get('screen').width-40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50
    },
    icon: {
        fontSize: 30,
    },
    iconBottom:{
        fontSize: 20,
        marginHorizontal: 10
    },
    audioSlider: {
        width: Dimensions.get('screen').width-60,
        alignSelf: 'center'
    },
    volumeController: {
        flexDirection: 'row-reverse',
        marginLeft: 20,
        marginTop: 50,
        marginBottom: 20
    },
    volumeSlider: {
        width: 120
    },
    bottomView:{
        marginTop: 20,
        marginLeft: 20
    },
    text:{
        color: 'black'
    },
    audioTextContainer:{
        flexDirection: 'row-reverse'
    },
    audioText: {
        color: '#9e9e9e',
        marginTop: 2,
        marginRight: 25
    },
    detailTextLeft: {
        color: 'black',
        fontSize: 16,
        marginLeft: 5,
        paddingTop: 20,
        width: 100
    },
    detailTextRight: {
        color: 'black',
        fontSize: 16,
        marginLeft: 0,
        paddingTop: 20
    },
});

// import React from 'react';
// import {ImageBackground, Text, View, Modal, StyleSheet, Dimensions, TouchableOpacity, Slider} from 'react-native';
// import {styles} from '../styles/commons';
// import {Header} from '../commons/Header';
// import {Audio} from 'expo-av';
// import { AntDesign, Foundation, Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

// const playList = [
//     {name: "Comfort Fit - “Sorry”", uri:"https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3"},
//     {name: "Big Buck Bunny", uri:"http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"},
//     {name: "Mildred Bailey – “All Of Me”", uri:"https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3"}
// ];

// const DISABLED_OPACITY = 0.6;
// const LOADING_STRING = "... loading ...";
// const BUFFERING_STRING = "... buffering ...";

// export const AudioScreen = ({navigation}) => {

//     const [index, setIndex] = React.useState(0); 
//     const [playbackInstance, setInstance] = React.useState(null); 
//     const [isSeeking, setSeeking] = React.useState(false);
//     const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] = React.useState(false);
//     const [audioName, setName] = React.useState(LOADING_STRING);
//     const [isMuted, setMute]= React.useState(false);
//     const [playbackInstancePosition, setPosition]= React.useState(null);
//     const [playbackInstanceDuration, setDuration]= React.useState(null);
//     const [shouldPlay, setShouldPlay]= React.useState(false);
//     const [isPlaying, setIsPlaying]= React.useState(false);
//     const [isBuffering, setBuffering]= React.useState(false);
//     const [isLoading, setLoading]= React.useState(true);
//     const [volume, setVolume]= React.useState(1.0);
    
//     async function loadNewPlaybackInstance(playing){
//         if (playbackInstance != null) {
//             await playbackInstance.unloadAsync();
//             setInstance(null);
//         }
      
//         const source = { uri: playList[index].uri };
//         console.log('sedrtfgyhuji',index);
//         const initialStatus = {shouldPlay: playing, rate: 1.0, volume: volume, isMuted: isMuted, isLooping: true};
//         const {sound, status } = await Audio.Sound.createAsync(
//               source,
//               initialStatus,
//               onPlaybackStatusUpdate
//             );
//         setInstance(sound);
//         updateScreenForLoading(false);
//     }

//     function onPlaybackStatusUpdate (status){
//         if (status.isLoaded) {
//             setPosition(status.positionMillis);
//             setDuration(status.durationMillis);
//             setShouldPlay(status.shouldPlay);
//             setIsPlaying(status.isPlaying);
//             setBuffering(status.isBuffering);
//             setMute(status.isMuted);
//             setVolume(status.volume);
//             if (status.error) {
//                 console.log(`FATAL PLAYER ERROR: ${status.error}`);
//             }
//     }}

    
//     function getSeekSliderPosition(){
//         if (playbackInstance != null && playbackInstancePosition != null && playbackInstanceDuration != null) {
//             return (playbackInstancePosition / playbackInstanceDuration);
//           }
//           return 0;
//     }

//     onSeekSliderValueChange = value => {
//         if (playbackInstance != null && !isSeeking) {
//           setSeeking(true);
//           setShouldPlayAtEndOfSeek(shouldPlay);
//           playbackInstance.pauseAsync();
//         }
//     };

//     onSeekSliderSlidingComplete = async value => {
//         if (playbackInstance != null) {
//             setSeeking(false);
//             const seekPosition = value * playbackInstanceDuration;
//             if (shouldPlayAtEndOfSeek) {
//                 playbackInstance.playFromPositionAsync(seekPosition);
//             } else {
//                 playbackInstance.setPositionAsync(seekPosition);
//             }
//           }
//     };

//     function getTimeStamp(){
//         if (playbackInstance != null && playbackInstancePosition != null && playbackInstanceDuration != null) {
//             return `${getMMSSFromMillis(playbackInstancePosition)} / ${getMMSSFromMillis(playbackInstanceDuration)}`;
//           }
//           return "";
//     }

//     function getMMSSFromMillis(millis) {
//         const totalSeconds = millis / 1000;
//         const seconds = Math.floor(totalSeconds % 60);
//         const minutes = Math.floor(totalSeconds / 60);
    
//         const padWithZero = number => {
//           const string = number.toString();
//           if (number < 10) {
//             return "0" + string;
//           }
//           return string;
//         };
//         return padWithZero(minutes) + ":" + padWithZero(seconds);
//     }

//     onMutePressed = () => {
//         if (playbackInstance != null) {
//             playbackInstance.setIsMutedAsync(!isMuted);
//         }
//     }

//     onBackPressed = () => {
//         if (playbackInstance != null) {
//             setIndex((index + playList.length - 1) % playList.length);
//             updatePlaybackInstanceForIndex(true);
//         }
//     }

//     onForwardPressed = () => {
//         if (playbackInstance != null) {
//             console.log('before',index)
//             setIndex((index +  1) % playList.length);
//             console.log('after',index)
//             updatePlaybackInstanceForIndex(true);
//             console.log('then',index)
//         }
//     }

//     onStopPressed = () => {
//         if (playbackInstance != null) {
//             playbackInstance.stopAsync();
//         }
//     }

//     function onPlayPausePressed(){
//         if (playbackInstance != null) {
//             if (isPlaying) {
//               playbackInstance.pauseAsync();
//             } else {
//               playbackInstance.playAsync();
//             }
//         }
//     }


//     const onVolumeSliderValueChange = value => {
//         if (playbackInstance != null) {
//             playbackInstance.setVolumeAsync(value);
//         }
//     }

//     async function updatePlaybackInstanceForIndex(playing) {
//         updateScreenForLoading(true);
//         loadNewPlaybackInstance(playing);
//     }

//     function updateScreenForLoading(isLoading){
//         if (isLoading) {
//             setIsPlaying(false);
//             setName(LOADING_STRING);
//             setDuration(null);
//             setPosition(null);
//             setLoading(true);
//         } else {
//             setName(playList[index].name);  
//             setLoading(false)  
//         }
//     }

//     React.useEffect(()=>{
//         Audio.setAudioModeAsync({
//             allowsRecordingIOS: false,
//             staysActiveInBackground: false,
//             interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
//             playsInSilentModeIOS: true,
//             shouldDuckAndroid: true,
//             interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
//             playThroughEarpieceAndroid: false
//         });
//         loadNewPlaybackInstance(false);
//     },[]);

//     return(
//     <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
//         <Header navigation={navigation}>Audio</Header>
//         <Modal style={stylesScreen.modal} transparent={true} animationType='fade' visible={true} onRequestClose={()=>{}}>
//             <View style={stylesScreen.modal}>
//                 <View style={[stylesScreen.modalView, {opacity: isLoading ? DISABLED_OPACITY : 1.0}]}>
//                     <TouchableOpacity onPress={()=>{}} style={{flexDirection:'row-reverse', marginLeft: 10, marginTop: 10}}>
//                         <MaterialCommunityIcons name='close-box' style={stylesScreen.icon}/>  
//                     </TouchableOpacity>
//                     <Text style={stylesScreen.header}>{audioName}</Text>
//                     <View style={stylesScreen.audioController} >
//                         <Slider style={stylesScreen.audioSlider} 
//                                 value={getSeekSliderPosition()}
//                                 onValueChange={onSeekSliderValueChange()}
//                                 onSlidingComplete={onSeekSliderSlidingComplete}
//                                 disabled={isLoading}
//                                 />
//                         <View style={stylesScreen.audioTextContainer}>
//                             <Text style={stylesScreen.audioText}>{getTimeStamp()}</Text>
//                             <Text style={stylesScreen.audioText}>{isBuffering ? BUFFERING_STRING : ""}</Text>
//                         </View>
//                     </View>
//                     <View style={stylesScreen.mainController}>
//                         <TouchableOpacity disabled={isLoading} onPress={()=>onBackPressed()}><AntDesign name='banckward' style={stylesScreen.icon}/></TouchableOpacity> 
//                         <TouchableOpacity disabled={isLoading} onPress={()=>onPlayPausePressed()}><FontAwesome name={isPlaying? 'pause' :'play'} style={stylesScreen.icon}/></TouchableOpacity> 
//                         <TouchableOpacity disabled={isLoading} onPress={()=>onStopPressed()}><Foundation name='stop' style={stylesScreen.icon}/></TouchableOpacity>
//                         <TouchableOpacity disabled={isLoading} onPress={()=>onForwardPressed()}><AntDesign name='forward' style={stylesScreen.icon}/></TouchableOpacity>
//                     </View>
                
//                     <View style={stylesScreen.volumeController}>
//                         <Slider style={stylesScreen.volumeSlider}
//                                 value={1}
//                                 onValueChange={onVolumeSliderValueChange}
//                                 disabled={isLoading}
//                                 />
//                         <TouchableOpacity disabled={isLoading} onPress={()=>onMutePressed()}><Ionicons name={isMuted?'md-volume-off':'md-volume-high'} style={stylesScreen.icon}/></TouchableOpacity> 
//                     </View>
//                     <View flexDirection='row'>
//                         <MaterialCommunityIcons name='delete-outline' style={stylesScreen.iconBottom} onPress={()=>setVisible(false)}/>
//                         <MaterialIcons name='favorite-border' style={stylesScreen.iconBottom} onPress={()=>setVisible(false)}/>
//                         <Ionicons name='md-share' style={stylesScreen.iconBottom} onPress={()=>setVisible(false)}/>
//                     </View>    
//                     <View style={stylesScreen.bottomView}>
//                         <Text style={{fontWeight: 'bold', fontSize:20}}>Details: </Text>
//                         <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Title :</Text><Text style={stylesScreen.detailTextRight}>Title1</Text></View>
//                         <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Album :</Text><Text style={stylesScreen.detailTextRight}>Album1</Text></View>
//                         <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Artist :</Text><Text style={stylesScreen.detailTextRight}>Artist1</Text></View>
//                     </View>
//                 </View>
//             </View>
//         </Modal>
//     </ImageBackground>
// );
// }

// const stylesScreen = StyleSheet.create({
//     modal: {
//         flex:1,
//         padding: 0,
//         backgroundColor: 'rgba(0,0,0,0.7)',
//     },
//     modalView: {
//         height: Dimensions.get('screen').height - 100,
//         marginTop: 50,
//         alignSelf: 'center',
//         backgroundColor: 'white',
//         width: Dimensions.get('screen').width-40,
//         borderRadius: 20,
//         marginTop: 40

//     },
//     input: {
//         width: Dimensions.get('screen').width-80,
//         alignSelf: 'center',
//         borderBottomColor: 'black',
//         borderBottomWidth: 2
//     },
//     header:{
//         marginTop: 0,
//         marginLeft: 20,
//         marginBottom: 40,
//         fontSize: 18,
//         fontWeight: 'bold'
//     },
//     mainController:{
//         top: 40,
//         width: Dimensions.get('screen').width-40,
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         height: 50
//     },
//     icon: {
//         fontSize: 30,
//     },
//     iconBottom:{
//         fontSize: 20,
//         marginHorizontal: 10
//     },
//     audioSlider: {
//         width: Dimensions.get('screen').width-60,
//         alignSelf: 'center'
//     },
//     volumeController: {
//         flexDirection: 'row-reverse',
//         marginLeft: 20,
//         marginTop: 50,
//         marginBottom: 20
//     },
//     volumeSlider: {
//         width: 120
//     },
//     bottomView:{
//         marginTop: 20,
//         marginLeft: 20
//     },
//     text:{
//         color: 'black'
//     },
//     audioTextContainer:{
//         flexDirection: 'row-reverse'
//     },
//     audioText: {
//         color: '#9e9e9e',
//         marginTop: 2,
//         marginRight: 25
//     },
//     detailTextLeft: {
//         color: 'black',
//         fontSize: 16,
//         marginLeft: 50,
//         paddingTop: 20,
//         width: 100
//     },
//     detailTextRight: {
//         color: 'black',
//         fontSize: 16,
//         marginLeft: 20,
//         paddingTop: 20
//     },
// });
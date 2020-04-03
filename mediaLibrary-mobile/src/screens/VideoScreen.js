import React from 'react';
import {ImageBackground, Text, View, StyleSheet} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {styles} from '../styles/commons';
import {Header} from '../commons/Header';
import Video from 'react-native-video';

export const VideoScreen = ({navigation}) => (
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
        <Header navigation={navigation}>Video</Header>

{/* // Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like. */}
{/* 
<Video source={{uri: '../../assets/video1.mp4'}}   // Can be a URL or a local file.
       ref={(ref) => {
         this.player = ref
       }}                                      // Store reference
       onBuffer={this.onBuffer}                // Callback when remote video is buffering
       onError={this.videoError}               // Callback when video cannot be loaded
       style={styles1.backgroundVideo} /> */}
{/* <Video
    // onEnd={this.onEnd}
    // onLoad={this.onLoad}
    // onLoadStart={this.onLoadStart}
    // onProgress={this.onProgress}
    // paused={false}
    // ref={videoPlayer => (this.videoPlayer = videoPlayer)}
    // resizeMode={this.state.screenType}
    // onFullScreen={this.state.isFullScreen}
    source={{ uri: 'https://www.youtube.com/watch?v=MPV2METPeJU' }}
    // style={styles.mediaPlayer}
    // volume={10}
/> */}

    </ImageBackground>
);

// Later on in your styles..
var styles1 = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });
import React from 'react';
import {ImageBackground, Text, View, StyleSheet} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {styles} from '../styles/commons';
import {Header} from '../commons/Header';
import Video from 'react-native-video';
import { AuthContext } from '../navigators/context';


export const VideoScreen = ({navigation, route}) => {
  const {authContext,state} = React.useContext(AuthContext); 
  return(
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
      <Header navigation={navigation}>{console.log(state.userToken)}</Header>
    </ImageBackground>
);}

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
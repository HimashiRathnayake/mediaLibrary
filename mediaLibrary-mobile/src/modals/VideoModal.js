import React, { useState } from 'react';
import { Text, View, Modal, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import {styles} from '../styles/commons';
import {Video} from 'expo-av';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const DISABLED_OPACITY = 0.3;
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get("window");
const LOADING_STRING = "... loading ...";
const VIDEO_CONTAINER_HEIGHT = (DEVICE_HEIGHT * 2.0) / 5.0 ;

export const VideoModal = ({visible, setVisible, videoModal}) => {

    const [audioName, setName] = useState(LOADING_STRING);
    const [isLoading, setLoading]= useState(true);

    function onLoadStart(){
        setLoading(true);
        setName(LOADING_STRING);
        console.log(`ON LOAD START`);
    };
    
    function onLoad (status){
        setLoading(false);
        setName(videoModal.videoName)
        console.log(`ON LOAD : ${JSON.stringify(status)}`);
      };
    
    function onError (error){
        console.log(`ON ERROR : ${error}`);
    };

    return(
        <Modal style={stylesScreen.modal} transparent={false} animationType='fade' visible={visible} onRequestClose={()=>{}}>
            <View style={[stylesScreen.modal,  {opacity: isLoading ? DISABLED_OPACITY : 1.0}]}>
                <TouchableOpacity onPress={()=>{setVisible(false)}} style={{flexDirection:'row-reverse', marginLeft: 10, marginTop: 10}}>
                    <MaterialCommunityIcons name='close-box' style={stylesScreen.icon}/>  
                </TouchableOpacity>
                <Text style={stylesScreen.header}>{audioName}</Text>
                <View style={styles.videoContainer}>
                    <Video
                        source={{uri: videoModal.path}}
                        style={[
                        styles.video,
                        {
                            opacity: isLoading ? 0.0 : 1.0,
                            width: Dimensions.get('screen').width,
                            height: VIDEO_CONTAINER_HEIGHT
                        }
                        ]}
                        resizeMode={Video.RESIZE_MODE_CONTAIN}
                        onLoadStart={onLoadStart}
                        onLoad={onLoad}
                        onError={onError}
                        useNativeControls = {true}
                    />
                </View>
                
                <View flexDirection='row-reverse'>
                    <MaterialCommunityIcons name='delete-outline' style={stylesScreen.iconBottom} onPress={()=>setVisible(false)}/>
                    <MaterialIcons name='favorite-border' style={stylesScreen.iconBottom} onPress={()=>setVisible(false)}/>
                    <Ionicons name='md-share' style={stylesScreen.iconBottom} onPress={()=>setVisible(false)}/>
                </View> 

                <View style={stylesScreen.bottomView}>
                    <Text style={{fontWeight: 'bold', fontSize:20}}>Details: </Text>
                    <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Title :</Text><Text style={stylesScreen.detailTextRight}>{videoModal.title}</Text></View>
                    <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Artist :</Text><Text style={stylesScreen.detailTextRight}>{videoModal.artist}</Text></View>
                </View>
            </View>
        </Modal>
);
}

const stylesScreen = StyleSheet.create({
    modal: {
        flex:1,
        padding: 0,
        backgroundColor: 'white',
        color: '#fff'
    },
    header:{
        marginTop: 0,
        marginLeft: 20,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
    icon: {
        fontSize: 30,
    },
    iconBottom:{
        marginTop: 10,
        fontSize: 20,
        marginHorizontal: 20
    },
    bottomView:{
        marginTop: 20,
        marginLeft: 20
    },
    detailTextLeft: {
        color: 'black',
        fontSize: 16,
        marginLeft: 50,
        paddingTop: 20,
        width: 100
    },
    detailTextRight: {
        color: 'black',
        fontSize: 16,
        marginLeft: 20,
        paddingTop: 20,
        width: Dimensions.get('screen').width/2,
    },
});
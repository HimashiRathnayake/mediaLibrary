import React, { useState } from 'react';
import { Text, View, Modal, TouchableOpacity, Alert } from 'react-native';
import {Video} from 'expo-av';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import {deleteVideo, renameVideo} from '../api/video';
import {stylesScreen} from '../styles/modals/video';
import { DetailsModal } from './DetailsModal';

const DISABLED_OPACITY = 0.3;

export const VideoModal = ({visible, setVisible, videoModal, setRefresh}) => {

    const [isLoading, setLoading]= useState(true);
    const [detailsModal, setDetailsModal] = useState(false);

    function deletevideo(videoId){
        setVisible(false);
        deleteVideo({videoId: videoId})
        .then((response)=>{
            console.log(response);
            setRefresh(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    function renamevideo(videoId,name){
        renameVideo({videoId: videoId, name:name})
        .then((response)=>{
            setRefresh(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    function onLoadStart(){
        setLoading(true);
        console.log(`ON LOAD START`);
    };
    
    function onLoad (status){
        setLoading(false);
        console.log(`ON LOAD : ${JSON.stringify(status)}`);
      };
    
    function onError (error){
        console.log(`ON ERROR : ${error}`);
    };

    return(
        <View>
        <Modal style={stylesScreen.modal} transparent={true} animationType='slide' visible={visible} onRequestClose={()=>{setVisible(false);}}>
            <View style={[stylesScreen.modal]}>
                <View style={[stylesScreen.modalView, {opacity: isLoading ? DISABLED_OPACITY : 1.0}]}>

                    <TouchableOpacity onPress={()=>{setVisible(false);}} style={{flexDirection:'row-reverse', marginLeft: 20, marginTop: 30, position: 'absolute'}}>
                        <Ionicons name='md-arrow-back' style={stylesScreen.icon}/>  
                    </TouchableOpacity>
                    <View style={{ alignItems: "center", marginTop: 24 }}>
                        <Text style={stylesScreen.headerTop}>MyMedia Video</Text>
                        <Text style={stylesScreen.header}>{videoModal.videoName.substring(0,25)}</Text>
                    </View>
                    <View style={stylesScreen.videoContainer}>
                        <Video
                            source={{uri: videoModal.path}}
                            style={[stylesScreen.video,{opacity: isLoading ? 0.0 : 1.0,}]}
                            resizeMode={Video.RESIZE_MODE_CONTAIN}
                            onLoadStart={onLoadStart}
                            onLoad={onLoad}
                            onError={onError}
                            useNativeControls = {true}
                        />
                    </View>
                    
                    <View flexDirection='row-reverse'>
                        <MaterialCommunityIcons name='delete-outline' style={stylesScreen.iconBottom} 
                            onPress={()=>{ 
                                Alert.alert('Do you want to delete video','',[
                                    {text: 'Cancel'},
                                    {text: "Yes", onPress: ()=>deletevideo(videoModal._id)}
                            ],{cancelable:false})}}
                        />
                        <MaterialIcons name='favorite-border' style={stylesScreen.iconBottom} onPress={()=>setVisible(false)}/>
                        <Ionicons name='md-share' style={stylesScreen.iconBottom} onPress={()=>setVisible(false)}/>
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
            file={videoModal} type='Video' 
            detailsModal={detailsModal} 
            setDetailsModal={setDetailsModal} 
            renameFile={renamevideo} 
            setRefresh={setRefresh}
        />

        </View>
);
}
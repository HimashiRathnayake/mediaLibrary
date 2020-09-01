import React, { useState } from 'react';
import { Text, View, Modal, TouchableOpacity, Alert, Dimensions } from 'react-native';
import {Video} from 'expo-av';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import {deleteVideo, renameVideo} from '../api/video';
import {stylesScreen} from '../styles/modals/video';
import { DetailsModal } from './DetailsModal';
import { ToolTip } from '../commons/ToolTip';
import {getIsFavorite, addToFavourite, removeFromFavorites} from '../api/favorites';
import GestureRecognizer from 'react-native-swipe-gestures';

const DISABLED_OPACITY = 0.3;

export const VideoModal = ({visible, setVisible, videoModal, setRefresh, insideFolder, setVideoModal, type, index, openModal, count}) => {

    const [isLoading, setLoading]= useState(true);
    const [detailsModal, setDetailsModal] = useState(false);
    const [isFavorite, setIsFavorite] = useState(null);
    const [disableBackward, setDisableB] = useState(false);
    const [disableForward, setDisableF] = useState(false);
    const [message, setMessage] = useState(null);

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    function previousVideo(){
        console.log(index)
        if(index < 1){
            setDisableB(true);
		}else{
            setDisableB(false)
            setVisible(false);
            openModal(true, index-1)
        }
    }

    function nextVideo(){
        console.log(index)
        if(index >= count){
			setDisableF(true);
		}else{
            setDisableF(false)
            setVisible(false);
            openModal(true, index+1);
        }
    }

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
        setMessage("Renaming Video ...")
        renameVideo({videoId: videoId, name:name})
        .then((response)=>{
            if(response.message=="Video renamed successfully"){
                setRefresh(true);
                setTimeout(()=>setMessage('Video renamed successfully'), 2200);
                setTimeout(()=>setMessage(null), 2500);
            }else{
                setTimeout(()=>setMessage('Something went wrong.'), 2300);
                setTimeout(()=>setMessage(null), 2600);
            }
        })
        .catch((error)=>{
            setTimeout(()=>setMessage('Something went wrong.'), 2300);
            setTimeout(()=>setMessage(null), 2600);
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

    function setFavorite(videoId){
        setMessage('Adding to favourites .... ');
        addToFavourite('Video', videoId)
        .then((response)=>{
            if(response.message=="Add video to favourites"){
                setRefresh(true);
                setTimeout(()=>setMessage('Added to Favourites.'), 2200);
                setTimeout(()=>setMessage(null), 2500);
            }else{
                setTimeout(()=>setMessage('Something went wrong.'), 2300);
                setTimeout(()=>setMessage(null), 2600);
            }
        })
        .catch((error)=>{
            setTimeout(()=>setMessage('Something went wrong.'), 2300);
            setTimeout(()=>setMessage(null), 2600);
            console.log(error);
        })
    }

    function removeFavorite(videoId){
        setMessage('Removing from favourites .... ');
        if (type==='fav'){
            setVisible(false);
            setVideoModal(null)
        }
        removeFromFavorites('Video', videoId)
        .then((response)=>{
            if(response.message=="Remove video from favorites"){
                setRefresh(true);
                setTimeout(()=>setMessage('Removed from Favourites.'), 2200);
                setTimeout(()=>setMessage(null), 2500);
            }else{
                setTimeout(()=>setMessage('Something went wrong.'), 2300);
                setTimeout(()=>setMessage(null), 2600);
            }
        })
        .catch((error)=>{
            setTimeout(()=>setMessage('Something went wrong.'), 2300);
            setTimeout(()=>setMessage(null), 2600);
            console.log(error);
        })
    }

    React.useEffect(()=>{  
        if (videoModal!==null){
            getIsFavorite('Video',videoModal._id)
            .then((response)=>{
                setIsFavorite(response.isFavorite)
            })
        }
    },[videoModal])

    return(
        <GestureRecognizer
            onSwipeUp={(state) => setDetailsModal(true)}
            onSwipeDown={()=>setDetailsModal(false)}
            config={config}
        >
        <View>
        <Modal style={stylesScreen.modal} transparent={true} animationType='slide' visible={visible} onRequestClose={()=>{setVisible(false);}}>
            <View style={[stylesScreen.modal]} accessibilityLabel='videoModal'>
                <View style={[stylesScreen.modalView, {opacity: isLoading ? DISABLED_OPACITY : 1.0}]}>

                    <View accessibilityLabel='buttonSetView' flexDirection='row' marginTop={20} width={Dimensions.get('screen').width} height={60} flexDirection='row-reverse'>
                        <ToolTip content='View Details' dark={false} onPress={()=>setDetailsModal(true)}>       
                            <Entypo name='dots-three-vertical' style={stylesScreen.iconBottom} />
                        </ToolTip>

                        <ToolTip content='Delete Audio' dark={false} 
                            onPress={()=>{ 
                                Alert.alert('Do you want to delete video','',[
                                    {text: 'Cancel'},
                                    {text: "Yes", onPress: ()=>deletevideo(videoModal._id)}
                            ],{cancelable:false})}}
                        >
                            <MaterialCommunityIcons name='delete-outline' style={stylesScreen.iconBottom}/>
                        </ToolTip>
                        {isFavorite?
                        (
                            <ToolTip dark={false} content='Remove favourites' onPress={()=>removeFavorite(videoModal._id)}>
                                <MaterialIcons name='favorite' style={[stylesScreen.iconBottom,{color: '#ef5350'}]}/>
                            </ToolTip>
                        ):(
                            <ToolTip content='Add to favourites' dark={false} onPress={()=>setFavorite(videoModal._id)}>
                                <MaterialIcons name='favorite-border' style={stylesScreen.iconBottom}/>
                            </ToolTip>
                        )}    
                        {/* <Ionicons name='md-share' style={stylesScreen.iconBottom} onPress={()=>setVisible(false)}/> */}
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

                    <View flexDirection='row' style={{alignItems: 'center', alignSelf:'center'}}>
                        {/* <ToolTip content='Previous Video' dark={false} onPress={()=>previousVideo()} disabled={disableBackward}>
                            <AntDesign name='left' style={[{color: disableBackward?'red' :'black'}, stylesScreen.icons]}/>
                        </ToolTip> */}
                        <View style={{ alignItems: "center", marginTop: 35 }}>
                            <Text style={stylesScreen.headerTop}>MyMedia Video</Text>
                            <Text style={stylesScreen.header}>{videoModal.videoName.substring(0,25)}</Text>
                        </View>
                        {/* <ToolTip content='Next Video' dark={false} onPress={()=>nextVideo()} disabled={disableForward}>
                            <AntDesign name='right' style={[{color: disableForward?'red' :'black'},stylesScreen.icons]}/>
                        </ToolTip> */}
                    </View>
                    
                    {/* <View style={stylesScreen.bottom}>
                        <TouchableOpacity accessibilityLabel='detailsModalV' onPress={()=>setDetailsModal(true)}>
                            <View flexDirection='row'>
                                <Text style={[stylesScreen.bottomText, {marginRight:10}]}>View & edit Details</Text>
                                <AntDesign name='caretdown' style={stylesScreen.bottomText}/>
                            </View>
                        </TouchableOpacity>
                    </View> */}

                    <TouchableOpacity accessibilityLabel='backV' onPress={()=>{setVisible(false);}} style={{flexDirection:'row-reverse', marginLeft: 20, marginTop: 30, position: 'absolute'}}>
                        <Ionicons name='md-arrow-back' style={stylesScreen.icon}/>  
                    </TouchableOpacity>
                    
                </View>
            </View>
        </Modal>

        <DetailsModal 
            file={videoModal} 
            type='Video' 
            detailsModal={detailsModal} 
            setDetailsModal={setDetailsModal} 
            setVisible={setVisible}
            renameFile={renamevideo} 
            setRefresh={setRefresh}
            enableFolder={insideFolder}
            setFile = {setVideoModal}
            message = {message}
            setMessage = {setMessage}
        />

        </View>
        </GestureRecognizer>
);
}
import React, { useState } from 'react';
import {View, Modal, Image, Alert, Text} from 'react-native';
import {MaterialIcons, MaterialCommunityIcons, Entypo, Ionicons} from '@expo/vector-icons';
import {stylesScreen} from '../styles/modals/image';
import {deleteImage, renameImage} from '../api/image';
import { DetailsModal } from './DetailsModal';
import {getIsFavorite, addToFavourite, removeFromFavorites} from '../api/favorites';
import {ToolTip} from '../commons/ToolTip';
import GestureRecognizer from 'react-native-swipe-gestures';

export const ImageModal = ({modelImage, count, index, modelVisible, setVisible, setRefresh, enableFolder, setImage, type, openModal}) => {
    const [detailsModal, setDetailsModal] = useState(false);
    const [isFavorite, setIsFavorite] = useState(null);
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    function onSwipeLeft() {
        if (index+1 < count){
            setVisible(false);
            openModal(true, index+1);
        }
    }

    function onSwipeRight() {
        if (index-1 >= 0){
            setVisible(false);
            openModal(true, index-1)
        }
    }

    React.useEffect(()=>{  
        if (modelImage!==null){
            getIsFavorite('Image',modelImage._id)
            .then((response)=>{
                setIsFavorite(response.isFavorite)
            })
        }else{
            setVisible(false);
            setDetailsModal(false);
        }
    },[modelImage])

    function deleteimage(imageId){
        setImage(null)
        setVisible(false); 
        deleteImage({imageId: imageId})
        .then((response)=>{
            console.log(response);
            setRefresh(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    function renameimage(imageId,name){
        renameImage({imageId: imageId, name:name})
        .then((response)=>{
            setRefresh(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    function setFavorite(imageId){
        addToFavourite('Image', imageId)
        .then((response)=>{
            setRefresh(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    function removeFavorite(imageId){
        if (type==='fav'){
            setVisible(false);
            setImage(null)
        }
        removeFromFavorites('Image', imageId)
        .then((response)=>{
            setRefresh(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return(
        <GestureRecognizer
            onSwipeUp={(state) => setDetailsModal(true)}
            onSwipeLeft={(state)=> onSwipeLeft()}
            onSwipeRight={(state) => onSwipeRight()}
            onSwipeDown={()=>setDetailsModal(false)}
            config={config}
        >
        <View>
            <Modal style={stylesScreen.modal} transparent={false} animationType='slide' visible={modelVisible} onRequestClose={()=>{setVisible(false); setIsFavorite(null)}}>
                <View style={stylesScreen.modal}>
                    <View style={stylesScreen.modalView}>
                        <View style={{justifyContent:'center'}}>
                            <Image source={{uri:modelImage.path}} style={stylesScreen.originalImage}/>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal transparent={true} animationType='slide' visible={modelVisible} onRequestClose={()=>{setVisible(false); setIsFavorite(null)}} style={stylesScreen.bottomModal}>
                <View style={stylesScreen.bottomModal}>
                    <View style={{ alignItems: "center", marginTop: 24 }}>
                        <Text style={stylesScreen.bottomHeader}>MyMedia Image</Text>
                        <Text style={stylesScreen.bottomText}>{modelImage.imageName.substring(0,26)}</Text>
                    </View>
                </View>
            </Modal>

            <Modal transparent={true} animationType='slide' visible={modelVisible} onRequestClose={()=>{setVisible(false); setIsFavorite(null)}}>
                <View style={stylesScreen.upModal}>
                    <View flexDirection= 'row-reverse' style={stylesScreen.upModal} accessibilityLabel='upModal'>
                        
                        
                        <ToolTip content='View Details' dark={true} onPress={()=>setDetailsModal(true)}>       
                            <Entypo name='dots-three-vertical' style={stylesScreen.icon} />
                        </ToolTip>   

                        <ToolTip content='Delete Image' dark={true}
                            onPress={()=>{
                                Alert.alert('Do you want to delete image','',[
                                    {text: 'Cancel'},
                                    {text: "Yes", onPress: ()=>deleteimage(modelImage._id)}
                                ],{cancelable:false})}
                            }>       
                            <MaterialCommunityIcons name='delete-outline' style={stylesScreen.icon}/>
                        </ToolTip>

                        {isFavorite?
                        (
                            <ToolTip dark={true} content='Remove from favourites' onPress={()=>{removeFavorite(modelImage._id);}}>
                                <MaterialIcons name='favorite' style={[stylesScreen.icon,{color: '#ef5350'}]}/>
                            </ToolTip>
                        ):(
                            <ToolTip dark={true} content='Add to favourites' onPress={()=>{setFavorite(modelImage._id);}}>
                                <MaterialIcons name='favorite-border' style={stylesScreen.icon}/>
                            </ToolTip>
                        )}
                        {/* <Ionicons name='md-share' style={stylesScreen.icon} onPress={()=>setVisible(false)}/> */}
                        <Ionicons name='md-arrow-back' style={stylesScreen.iconLeft} onPress={()=>{setVisible(false);}}/>
                    </View>
                </View>

            </Modal>

            <DetailsModal 
                file={modelImage} 
                type='Image' 
                setDetailsModal={setDetailsModal} 
                setVisible={setVisible}
                detailsModal={detailsModal} 
                renameFile={renameimage} 
                setRefresh={setRefresh}
                enableFolder={enableFolder}
                setFile={setImage}
            />

        </View>
        </GestureRecognizer>
    );
}

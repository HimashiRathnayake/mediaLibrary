import React, { useState } from 'react';
import {View, Modal, Image, Alert} from 'react-native';
import {MaterialIcons, MaterialCommunityIcons, Entypo, Ionicons} from '@expo/vector-icons';
import {stylesScreen} from '../styles/modals/image';
import {deleteImage, renameImage} from '../api/image';
import { DetailsModal } from './DetailsModal';
import {getIsFavorite, addToFavourite, removeFromFavorites} from '../api/favorites';
import {ToolTip} from '../commons/ToolTip';

export const ImageModal = ({modelImage, modelVisible, setVisible, setRefresh}) => {
    const [detailsModal, setDetailsModal] = useState(false);
    const [isFavorite, setIsFavorite] = useState(null);

    React.useEffect(()=>{  
        if (modelImage!==null){
            getIsFavorite('Image',modelImage._id)
            .then((response)=>{
                setIsFavorite(response.isFavorite)
            })
        }
    },[modelImage])

    function deleteimage(imageId){
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
        removeFromFavorites('Image', imageId)
        .then((response)=>{
            setRefresh(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    if (modelImage===null){
        setVisible(false);
        setDetailsModal(false);
    }

    return(
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

            <Modal transparent={true} animationType='slide' visible={modelVisible} onRequestClose={()=>{setVisible(false); setIsFavorite(null)}}>
                <View style={stylesScreen.upModal}>
                    <View flexDirection= 'row-reverse' style={stylesScreen.upModal}>
                        
                        
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
                            <ToolTip dark={true} content='Remove from favourites' onPress={()=>removeFavorite(modelImage._id)}>
                                <MaterialIcons name='favorite' style={[stylesScreen.icon,{color: '#ef5350'}]}/>
                            </ToolTip>
                        ):(
                            <ToolTip dark={true} content='Add to favourites' onPress={()=>setFavorite(modelImage._id)}>
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
                detailsModal={detailsModal} 
                renameFile={renameimage} 
                setRefresh={setRefresh}
            />

        </View>
    );
}

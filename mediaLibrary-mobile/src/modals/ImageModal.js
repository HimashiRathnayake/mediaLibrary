import React, { useState } from 'react';
import {Text, View, Modal, Image, Alert, TouchableOpacity} from 'react-native';
import {Ionicons, MaterialIcons, MaterialCommunityIcons, Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import {stylesScreen} from '../styles/modals/image';
import {deleteImage, renameImage} from '../api/image';
import { DetailsModal } from './DetailsModal';

export const ImageModal = ({modelImage, modelVisible, setVisible, setRefresh}) => {
    const [detailsModal, setDetailsModal] = useState(false);
    const [name, setName] = useState(null);

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

    function shareImage(){

    }

    return(
        <View style={{backgroundColor:'#fff'}}>
            <Modal style={stylesScreen.modal} transparent={false} animationType='slide' visible={modelVisible} onRequestClose={()=>{setVisible(false); setName(null)}}>
                <View style={stylesScreen.modal}>
                    <View style={stylesScreen.modalView}>
                        <View flexDirection= 'row-reverse'>
                            <Entypo name='dots-three-vertical' style={stylesScreen.icon} 
                                onPress={()=>{setDetailsModal(true);}}
                            />
                            <MaterialCommunityIcons name='delete-outline' style={stylesScreen.icon} 
                                onPress={()=>{
                                    Alert.alert('Do you want to delete image','',[
                                        {text: 'Cancel'},
                                        {text: "Yes", onPress: ()=>deleteimage(modelImage._id)}
                                    ],{cancelable:false})}}
                            />
                            <MaterialIcons name='favorite-border' style={stylesScreen.icon} onPress={()=>setVisible(false)}/>
                            <Ionicons name='md-share' style={stylesScreen.icon} onPress={()=>setVisible(false)}/>
                            <AntDesign name='left' style={stylesScreen.iconLeft} onPress={()=>{setVisible(false); setName(null)}}/>
                        </View>
                        <View style={{justifyContent:'center'}}>
                            <Image source={{uri:modelImage.path}} style={stylesScreen.originalImage}/>
                        </View>
                    </View>
                </View>
            </Modal>
            
            <DetailsModal file={modelImage} type='Image' setDetailsModal={setDetailsModal} detailsModal={detailsModal} renameFile={renameimage} name={name} setName={setName}/>
            
        </View>
    );
}

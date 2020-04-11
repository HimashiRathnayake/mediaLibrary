import React from 'react';
import {Text, View, Modal, Image} from 'react-native';
import {Ionicons, MaterialIcons, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import {stylesScreen} from '../styles/modals/image';
import {deleteImage} from '../api/image';

export const ImageModal = ({modelImage, modelVisible, setVisible, setRefresh}) => {
    const [detailsModal, setDetailsModal] = React.useState(false);

    function deleteimage(imageId){
        deleteImage({imageId: imageId})
        .then((response)=>{
            console.log(response);
            setRefresh(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return(
        <Modal style={stylesScreen.modal} transparent={false} animationType='fade' visible={modelVisible} onRequestClose={()=>{}}>
            <View style={stylesScreen.modal}>
                <View flexDirection= 'row-reverse'>
                    <Entypo name='dots-three-vertical' style={stylesScreen.icon} onPress={()=>setDetailsModal(true)}/>
                    <MaterialCommunityIcons name='delete-outline' style={stylesScreen.icon} 
                        onPress={()=>{setVisible(false); deleteimage(modelImage._id)}}
                    />
                    <MaterialIcons name='favorite-border' style={stylesScreen.icon} onPress={()=>setVisible(false)}/>
                    <Ionicons name='md-share' style={stylesScreen.icon} onPress={()=>setVisible(false)}/>
                    <AntDesign name='left' style={stylesScreen.iconLeft} onPress={()=>setVisible(false)}/>
                </View>
                <Image source={{uri:modelImage.path}} style={stylesScreen.originalImage}/>
            </View>
            <Modal style={stylesScreen.modal} transparent={false} animationType='fade' visible={detailsModal} onRequestClose={()=>{}}>
                <View style={stylesScreen.modal}>
                    <View flexDirection= 'row'>
                        <AntDesign name='left' style={stylesScreen.back} onPress={()=>setDetailsModal(false)}/>
                        <Text style={stylesScreen.text}>Details</Text>
                    </View>
                    <View style={stylesScreen.details}>
                        <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Image Name :</Text><Text style={stylesScreen.detailTextRight}>{modelImage.imageName}</Text></View>
                        <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Title :</Text><Text style={stylesScreen.detailTextRight}>{modelImage.title}</Text></View>
                        <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Subject :</Text><Text style={stylesScreen.detailTextRight}>{modelImage.subject}</Text></View>
                        <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Artist :</Text><Text style={stylesScreen.detailTextRight}>{modelImage.artist}</Text></View>
                    </View>
                </View>
            </Modal>
        </Modal>
    );
}

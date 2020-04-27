import React from 'react';
import {Text, View, Modal, Image, Alert, TouchableOpacity, StatusBar} from 'react-native';
import {Ionicons, MaterialIcons, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import {stylesScreen} from '../styles/modals/image';
import {deleteImage} from '../api/image';
import { TextInput } from 'react-native-gesture-handler';

export const ImageModal = ({modelImage, modelVisible, setVisible, setRefresh}) => {
    const [detailsModal, setDetailsModal] = React.useState(false);
    const [renameModal, setRenameModal] = React.useState(false);

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

    return(
        <View style={{backgroundColor: 'black', flexGrow:2}}>
            <Modal style={stylesScreen.modal} transparent={false} animationType='fade' visible={modelVisible} onRequestClose={()=>{setVisible(false);}}>
                <View style={stylesScreen.modal}>
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
                        <AntDesign name='left' style={stylesScreen.iconLeft} onPress={()=>setVisible(false)}/>
                    </View>
                    <View style={{justifyContent:'center'}}>
                        <Image source={{uri:modelImage.path}} style={stylesScreen.originalImage}/>
                    </View>
                </View>
            </Modal>
            <Modal style={stylesScreen.modal} transparent={false} animationType='slide' visible={detailsModal} onRequestClose={()=>{setDetailsModal(false)}}>
                <View style={stylesScreen.modal}>
                    <View flexDirection= 'row'>
                        <AntDesign name='left' style={stylesScreen.back} onPress={()=>{setDetailsModal(false);}}/>
                        <Text style={stylesScreen.text}>Details</Text>
                    </View>
                    <View style={stylesScreen.detailsContainer}>
                    <View style={stylesScreen.details}>
                        <View flexDirection='row'>
                            <Text style={stylesScreen.detailTextLeft}>Image Name :</Text>
                            <TextInput style={stylesScreen.detailTextName}>{modelImage.imageName}</TextInput>
                            <TouchableOpacity onPress={()=>alert('awsedrtfgyuhij')}>
                                <AntDesign name='edit' style={stylesScreen.iconEdit}/>
                            </TouchableOpacity>
                        </View>
                        <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Title :</Text><Text style={stylesScreen.detailTextRight}>{modelImage.title}</Text></View>
                        <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Subject :</Text><Text style={stylesScreen.detailTextRight}>{modelImage.subject}</Text></View>
                        <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Artist :</Text><Text style={stylesScreen.detailTextRight}>{modelImage.artist}</Text></View>
                    </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

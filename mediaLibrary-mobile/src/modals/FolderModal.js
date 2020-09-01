import React from 'react';
import {Text, View, TouchableOpacity, Modal, TextInput, Alert} from 'react-native';
import {stylesScreen} from '../styles/folderStyles';
import {Formik} from 'formik';
import {createFolder, renameFolder} from "../api/folder";
import {renameImage} from '../api/image';
import {renameAudio} from '../api/audio';
import { renameVideo } from '../api/video';

export const FolderModal = ({modalVisible, setVisible, type, folderId, setRefresh, actionType, message, setMessage}) => {

    function startAction(folderName){
        if (actionType==='Create'){
            setMessage('Creating folder .... ');
            if (folderName===''){folderName='Untitled'}
            createFolder({name:folderName, type:type})
            .then((response)=>{
                if (response.message==="Folder created successfully"){
                    setRefresh(true);
                    setTimeout(()=>setMessage(null), 1400);
                }
                else{
                    setTimeout(()=>setMessage(null), 1000);
                    Alert.alert('Alert','Something Went wrong',[{text:'OK'}]);
                    setRefresh(true);
                }
            }).catch((error)=>{
                setTimeout(()=>setMessage(null), 1000);
                Alert.alert('Alert','Something Went wrong',[{text:'OK'}]);
                console.log(error);
            })       
        }else if (actionType==='Rename'){
            if (folderName===''){
                Alert.alert('You have to enter a name in order to rename the folder','',[{text:'OK'}]);
            }else{
                setMessage('Updating folder name .... ');
                renameFolder({name:folderName, folderId:folderId})
                .then((response)=>{
                    setTimeout(()=>setMessage(null), 1000);
                    if (response.message==="Folder renamed successfully"){
                        setRefresh(true);
                    }
                    else{
                        Alert.alert('Alert','Something Went wrong',[{text:'OK'}]);
                        setRefresh(true);
                    }
                }).catch((error)=>{
                    console.log(error);
                })        
            }
        }else if (actionType==='RenameImage'){
            if (folderName===''){
                Alert.alert('You have to enter a name in order to rename the image','',[{text:'OK'}]);
            }else{
                renameImage({imageId: folderId, name:folderName})
                .then((response)=>{
                    console.log(response)
                    setRefresh(true);
                })
                .catch((error)=>{
                    console.log(error);
                })    
            }
        }else if (actionType==='RenameAudio'){
            if (folderName===''){
                Alert.alert('You have to enter a name in order to rename the audio','',[{text:'OK'}]);
            }else{
                renameAudio({audioId: folderId, name:folderName})
                .then((response)=>{
                    console.log(response)
                    setRefresh(true);
                })
                .catch((error)=>{
                    console.log(error);
                })    
            }
        }else{
            if (folderName===''){
                Alert.alert('You have to enter a name in order to rename the video','',[{text:'OK'}]);
            }else{
                renameVideo({videoId: folderId, name:folderName})
                .then((response)=>{
                    console.log(response)
                    setRefresh(true);
                })
                .catch((error)=>{
                    console.log(error);
                })    
            }
        }
    }
    return(
        <Modal style={stylesScreen.modal} transparent={true} animationType='fade' visible={modalVisible} onRequestClose={()=>{}}>
            <View style={stylesScreen.modal} accessibilityLabel='folderModal1'>
                <Formik 
                    initialValues={{folderName:''}}
                    onSubmit={
                        (values)=>{
                            setVisible(false);
                            let folderName=values.folderName
                            startAction(folderName);                                 
                    }}
                >
                    {(props)=>(
                    <View style={stylesScreen.modalView}>
                        {actionType==='Create' && <Text style={stylesScreen.inputHeader}>Folder Name</Text>}
                        {actionType==='Rename' && <Text style={stylesScreen.inputHeader}>Rename Folder</Text>}
                        {actionType==='RenameImage' && <Text style={stylesScreen.inputHeader}>Rename Image</Text>}
                        {actionType==='RenameAudio' && <Text style={stylesScreen.inputHeader}>Rename Audio</Text>}
                        {actionType==='RenameVideo' && <Text style={stylesScreen.inputHeader}>Rename Video</Text>}
                        
                        <TextInput 
                            style={stylesScreen.input} 
                            placeholder={actionType==='Create'?'Enter Name':'Enter New Name'}
                            placeholderTextColor="#9e9e9e" 
                            onChangeText={props.handleChange('folderName')}
                            value={props.values.folderName}
                            accessibilityLabel='folderName1'
                            onSubmitEditing={()=>props.handleSubmit()}
                        />
                        <View style={stylesScreen.bottom}>
                            <TouchableOpacity accessibilityLabel='close' onPress={()=>{setVisible(false)}}><Text style={stylesScreen.text}>Close</Text></TouchableOpacity> 
                            <TouchableOpacity accessibilityLabel='done' onPress={()=>{props.handleSubmit();}}>
                                {actionType==='Create' && <Text style={stylesScreen.text}>Create</Text>}
                                {(actionType==='Rename' || actionType==='RenameImage' || actionType==='RenameAudio' || actionType==='RenameVideo') && <Text style={stylesScreen.text}>Rename</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>)}
                </Formik>
            </View>
        </Modal>
    );
}

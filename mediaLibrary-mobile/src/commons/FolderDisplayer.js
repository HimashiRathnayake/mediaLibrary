import React, {useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {stylesScreen} from '../styles/folderStyles';
import {deleteFolder} from "../api/folder";
import { FolderModal } from '../modals/FolderModal';

export const FolderDisplayer = ({setRefresh, folders, count, type, navigation}) => {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [renameModalVisible, setRenameModalVisible] = useState(false);
    const [actionModalVisible, setActionModalVisible] = useState(false);
    const [modalFolder, setModalFolder] = useState(null);
    const [message, setMessage] = useState(null);
    
    function deletefolder(folderId){
        // showProgress(true);
        setActionModalVisible(false);
        setMessage('Deleting folder .... ');
        deleteFolder({folderId: folderId})
        .then((response)=>{
            setTimeout(()=>setMessage(null), 1000);
            console.log(response)
            setRefresh(true);
            // showProgress(false);
        })
    }

    const folderSet = folders.map((val,key) => {
        return(
            <TouchableOpacity 
                accessibilityLabel={val._id}
                key={key} 
                onPress={()=>{navigation.push(type,{visible:false, folderId:val._id, folderName: val.folderName})}}
                delayLongPress= {1000}
                onLongPress={()=>{
                                setActionModalVisible(true); 
                                setModalFolder(val._id); 
                            }}
            >
                <View style={stylesScreen.folderWrapper}>
                    <MaterialIcons name='folder' style={stylesScreen.folderIcon}/>
                    <Text accessibilityLabel='folderName' style={stylesScreen.folderName}>{val.folderName.substring(0,10)}</Text>
                </View>
            </TouchableOpacity>
        )
    });
    
    return(
        <View>
            {count===0 ? 
            (<View style={stylesScreen.noFolderContainer}>
                <Text style={stylesScreen.noFolderText}>No {type} Folders found</Text>
                <TouchableOpacity accessibilityLabel='createFolder1' onPress={()=>{setCreateModalVisible (true)}}>
                    <View>
                        <MaterialIcons name='create-new-folder' style={stylesScreen.addFolderIcon}/>
                    </View>
                </TouchableOpacity>
            </View>):

            (<ScrollView style={stylesScreen.container}>
                <View style={stylesScreen.container}>
                    <TouchableOpacity accessibilityLabel='createFolder1' onPress={()=>{setCreateModalVisible(true)}}>
                        <View style={stylesScreen.folderWrapper}>
                            <MaterialIcons name='create-new-folder' style={stylesScreen.folderIcon}/>
                            <Text style={stylesScreen.folderName}>Create Folder</Text>
                        </View>
                    </TouchableOpacity>
                    {folderSet}
                </View>
                <Modal style={stylesScreen.folderActionModal} transparent={true} animationType='fade' visible={actionModalVisible} onRequestClose={()=>{}}>
                    <TouchableWithoutFeedback accessibilityLabel='actionModalButton' onPress={()=>setActionModalVisible(false)}>
                        <View style={stylesScreen.folderActionModal} accessibilityLabel='actionModal'>
                            <View style={stylesScreen.modalContainer}>
                                <TouchableOpacity accessibilityLabel='renamefolder' onPress={()=>{setActionModalVisible(false); setRenameModalVisible(true);}}>
                                    <Text style={stylesScreen.modalText}>Rename Folder</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    accessibilityLabel='deleteFolder'
                                    onPress={()=>
                                    Alert.alert('Do you want to delete folder','',[
                                        {text: 'Cancel', onPress: ()=>setActionModalVisible(false)},
                                        {text: "Yes", onPress: ()=>deletefolder(modalFolder)}
                                    ],{cancelable:false})}
                                    >
                                    <Text style={stylesScreen.modalText}>Delete Folder</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </ScrollView>
            )}

            <FolderModal modalVisible={createModalVisible} setVisible={setCreateModalVisible} type={type} setRefresh={setRefresh} actionType={'Create'} message={message} setMessage={setMessage}/>
            <FolderModal modalVisible={renameModalVisible} setVisible={setRenameModalVisible} type={type} setRefresh={setRefresh} folderId={modalFolder} actionType={'Rename'} message={message} setMessage={setMessage}/>
            
            <Modal transparent={true} animationType='fade' visible={message!=null} onRequestClose={()=>{}} style={stylesScreen.bottomBar}>
                <View style={stylesScreen.bottomBar}>
                    <View style={{ alignItems: "center", marginTop: 24 }}>
                        <Text style={stylesScreen.msg}>{message}</Text>
                    </View>
                </View>
            </Modal>
        </View>    
    );
}



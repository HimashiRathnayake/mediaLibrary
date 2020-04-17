import React, {useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {stylesScreen} from '../styles/folderStyles';
import {deleteFolder} from "../api/folder";
import { FolderModal } from '../modals/FolderModal';

export const FolderDisplayer = ({setRefresh, folders, count, type, navigation}) => {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [renameModalVisible, setRenameModalVisible] = useState(false);
    const [actionModalVisible, setActionModalVisible] = useState(false);
    const [modalFolder, setModalFolder] = useState(null);
    
    function deletefolder(folderId){
        showProgress(true);
        setActionModalVisible(false);
        deleteFolder({folderId: folderId})
        .then((response)=>{
            console.log(response)
            setRefresh(true);
            showProgress(false);
        })
    }

    const folderSet = folders.map((val,key) => {
        return(
            <TouchableOpacity 
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
                    <Text style={stylesScreen.folderName}>{val.folderName.substring(0,10)}</Text>
                </View>
            </TouchableOpacity>
        )
    });
    
    return(
        <View>
            {count===0 ? 
            (<View style={stylesScreen.noFolderContainer}>
                <Text style={stylesScreen.noFolderText}>No {type} Folders found</Text>
                <TouchableOpacity onPress={()=>{setCreateModalVisible (true)}}>
                    <View>
                        <MaterialIcons name='create-new-folder' style={stylesScreen.addFolderIcon}/>
                    </View>
                </TouchableOpacity>
            </View>):

            (<ScrollView style={stylesScreen.container}>
                <View style={stylesScreen.container}>
                    <TouchableOpacity onPress={()=>{setCreateModalVisible(true)}}>
                        <View style={stylesScreen.folderWrapper}>
                            <MaterialIcons name='create-new-folder' style={stylesScreen.folderIcon}/>
                            <Text style={stylesScreen.folderName}>Create Folder</Text>
                        </View>
                    </TouchableOpacity>
                    {folderSet}
                </View>
                <Modal style={stylesScreen.folderActionModal} transparent={true} animationType='fade' visible={actionModalVisible} onRequestClose={()=>{}}>
                    <TouchableWithoutFeedback onPress={()=>setActionModalVisible(false)}>
                        <View style={stylesScreen.folderActionModal}>
                            <View style={stylesScreen.modalContainer}>
                                <TouchableOpacity onPress={()=>{setActionModalVisible(false); setRenameModalVisible(true);}}>
                                    <Text style={stylesScreen.modalText}>Rename</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>deletefolder(modalFolder)}>
                                    <Text style={stylesScreen.modalText}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>alert('fgh')}>
                                    <Text style={stylesScreen.modalText}>Share</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </ScrollView>
            )}

            <FolderModal modalVisible={createModalVisible} setVisible={setCreateModalVisible} type={type} setRefresh={setRefresh} actionType={'Create'}/>
            <FolderModal modalVisible={renameModalVisible} setVisible={setRenameModalVisible} type={type} setRefresh={setRefresh} folderId={modalFolder} actionType={'Rename'}/>
        </View>    
    );
}



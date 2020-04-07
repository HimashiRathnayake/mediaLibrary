import React from 'react';
import {ImageBackground, Text, View, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native';
import {Header} from '../commons/Header';
import {styles} from '../styles/commons';
import {stylesScreen} from '../styles/folderStyles';
import {MaterialIcons } from '@expo/vector-icons';
import {getFolders, deleteFolder} from "../api/folder";
import { AuthContext } from '../navigators/context';
import { FolderModal } from '../modals/FolderModal';

export const FolderScreen = ({route,navigation}) => {
    const [modalVisible, setVisible] = React.useState(false);
    const [actionModal, actionModalVisible] = React.useState(false);
    const [folders, setFolders] = React.useState([]);
    const [count, setCount] = React.useState(null);
    const {authContext,state} = React.useContext(AuthContext); 
    const [refresh,setRefresh] = React.useState(false);
    const type=route.params.type;

    React.useEffect(()=>{  
        getFolders({token:state.userToken, type:type})
        .then((response)=>{
            setCount(response.count);
            setFolders(response.folders);
        })
        .catch((error)=>{
            console.log(error)
        })
        setRefresh(false);
    },[refresh])

    function deletefolder(folderId){
        console.log(folderId)
        deleteFolder({token:state.userToken, folderId: folderId})
        .then((response)=>{
            console.log(response)
            setRefresh(true);
        })
    }

    const folderSet = folders.map((val,key) => {
        return(
            <TouchableOpacity 
                key={key} 
                onPress={()=>{navigation.push(type,{visible:false, folderId:val._id, folderName: val.folderName})}}
                onLongPress={()=>{deletefolder(val._id)}}
            >
                <View style={stylesScreen.folderWrapper}>
                    <MaterialIcons name='folder' style={stylesScreen.folderIcon}/>
                    <Text style={stylesScreen.folderName}>{val.folderName.substring(0,10)}</Text>
                </View>
            </TouchableOpacity>
        )
    });

    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <Header navigation={navigation} token={state.userToken} setRefresh={setRefresh} type={type}>{type} Folders</Header>
            {count===0 ? 
            (<View style={stylesScreen.noFolderContainer}>
                <Text style={stylesScreen.noFolderText}>No Folders found</Text>
                <Text style={stylesScreen.noFolderText}>Create new Image</Text>
                <TouchableOpacity onPress={()=>{setVisible(true)}}>
                    <View>
                        <MaterialIcons name='create-new-folder' style={stylesScreen.addFolderIcon}/>
                    </View>
                </TouchableOpacity>
            </View>):
            (<ScrollView style={stylesScreen.container}>
                <View style={stylesScreen.container}>
                    <TouchableOpacity onPress={()=>{setVisible(true)}}>
                        <View style={stylesScreen.folderWrapper}>
                            <MaterialIcons name='create-new-folder' style={stylesScreen.folderIcon}/>
                            <Text style={stylesScreen.folderName}>Create Folder</Text>
                        </View>
                    </TouchableOpacity>
                    {folderSet}
                </View>
                <Modal style={stylesScreen.folderActionModal} transparent={true} animationType='fade' visible={actionModal} onRequestClose={()=>{}}>
                    <TouchableWithoutFeedback onPress={()=>actionModalVisible(false)}>
                        <View style={stylesScreen.folderActionModal}>
                            <View style={stylesScreen.modalContainer}>
                                <TouchableOpacity onPress={()=>{setVisible(false);}}>
                                    <Text style={stylesScreen.modalText}>Rename</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>alert('fgh')}><Text style={stylesScreen.modalText}>Delete</Text></TouchableOpacity>
                                <TouchableOpacity onPress={()=>alert('fgh')}><Text style={stylesScreen.modalText}>Share</Text></TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </ScrollView>
            )}
            <FolderModal modalVisible={modalVisible} setVisible={setVisible} token={state.userToken} type={type} setRefresh={setRefresh} actionType={'Create'}/>
        </ImageBackground>
    );
}
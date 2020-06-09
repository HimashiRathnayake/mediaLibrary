import React, { useState } from 'react';
import {Text, View, Dimensions, Modal,TouchableOpacity, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getFolders, moveFile } from '../api/folder';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const FolderList = ({visible, setVisible, fileId, type, setRefresh, setDetailsModal, setFileModal, setFile}) => {

    const [folders, setFolders] = useState([]);

    function moveToFolder(folderId){
        setFile(null);
        setVisible(false);
        moveFile(fileId, folderId, type)
        .then((response)=>{
            console.log(response);
            setRefresh(true);
            setDetailsModal(false);
            setFileModal(false);
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    React.useEffect(()=>{  
        getFolders({type:type})
        .then((response)=>{
            setFolders(response.folders);
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])
    
    const folderSet = folders.map((val,key)=>{
        return(
            <View key={key}>
                <TouchableOpacity onPress={()=>{moveToFolder(val._id)}} accessibilityLabel={val._id}>
                    <View style={styles.folderContainer}>
                        <View flexDirection='row'>
                            <MaterialCommunityIcons name='folder-move' style={styles.folderIcon}/>
                            <Text style={styles.folderName}>{val.folderName.substring(0, 30)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    })
    
    return(
        <Modal style={styles.modal} transparent={true} animationType='fade' visible={visible} onRequestClose={()=>{setVisible(false)}}>
            <View style={styles.modal} accessibilityLabel='folderListModal'>
                <View style={styles.modalView}>
                    <Text style={styles.header}>Move To Folder</Text>
                    <ScrollView>
                        {folderSet}
                    </ScrollView>
                    <View style={styles.bottom}>
                        <TouchableOpacity accessibilityLabel='cancel2' onPress={()=>setVisible(false)}>
                            <Text style={styles.submit}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>    
    );
}

const styles = StyleSheet.create({
    modal:{
        alignSelf: 'center',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingBottom: 40
    },
    modalView: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: Dimensions.get('screen').width - 20,
        height: Dimensions.get('screen').height *2/ 3,
        alignSelf: 'center',
        justifyContent: 'flex-end'
    },
    header:{
        marginBottom: 20,
        marginTop: 20,
        fontSize: 19,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    text: {
        marginBottom: 20,
        fontSize: 16,
        marginLeft: 20,
    },
    bottom: {
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    submit:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    folderContainer: {
        flexDirection: 'row',
        backgroundColor: '#93A8B3',
        alignSelf: 'center',
        width : Dimensions.get('screen').width - 50,
        padding: 10,
        marginVertical: 2,
        borderRadius: 10        
    },
    folderName: {
        color: '#fff',
        marginLeft: 8,
        marginRight: 2,
        fontSize: 16,
        width: Dimensions.get('screen').width - 145 ,
    },
    folderIcon:{
        color: '#fff',
		fontSize: 24,
		marginHorizontal: 10
    },
})

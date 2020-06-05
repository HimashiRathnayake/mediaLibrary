import React, { useState } from 'react';
import {Text, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image, Modal, Alert} from 'react-native';
import {stylesScreen} from '../styles/allImageScreen';
import {ImageModal} from '../modals/ImageModal';
import {FolderModal} from '../modals/FolderModal';
import {deleteImage} from '../api/image';
import { FolderList } from '../modals/FolderList';

export const ImageDisplayer = ({setRefresh, images, count, shouldMove}) => {

    const [modelVisible, setVisible] = useState(false);
    const [modelImage, setImage] = useState(null);
    const [index, setIndex] = useState(0);
    const [actionModalVisible, setActionModalVisible] = useState(false);
    const [renameModal, setRenameModalVisible] = useState(false);
    const [folderList, setfolderListVisible] = useState(false);

    async function setModelVisible(visible, imageKey){
        await setIndex(imageKey);
        await setImage(images[imageKey]);
        setVisible(visible);
    }

    async function setAction(val){
        setActionModalVisible(true);
        await setImage(val)
    }

    function deleteimage(imageId){
        setImage(null)
        deleteImage({imageId: imageId})
        .then((response)=>{
            setRefresh(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    React.useEffect(()=>{  
        if (modelImage!==null){
            setModelVisible(modelVisible, index)
        }
    },[images])
    
    const imageSet = images.map((val,key)=>{
        return(
            <TouchableOpacity key={key} 
                accessibilityLabel={val._id}
                onPress={()=>{setModelVisible(true, key)}}
                onLongPress={()=> setAction(val)}
            >
                <View style={stylesScreen.imagewrapper}>
                    <Image source={{uri:val.path}} style={stylesScreen.image}/>
                </View>
            </TouchableOpacity>
        )
    })
    return(
        <View>
            {count===0 ? 
                (<View style={stylesScreen.noImageContainer}>
                    <Text accessibilityLabel='noImage1' style={stylesScreen.noImageText}>No images found</Text>
                </View>
                ):
                (<ScrollView style={stylesScreen.container}>
                    <View style={stylesScreen.container} accessibilityLabel='imagesView'>
                        {(modelImage !== null) && (
                            <ImageModal modelImage={modelImage} modelVisible={modelVisible} setVisible={setVisible} setRefresh={setRefresh} enableFolder={shouldMove} setImage={setImage}/>
                        )}
                        {imageSet}
                    </View>
                </ScrollView>)
            }

                {(modelImage !== null) && (
                <Modal style={stylesScreen.folderActionModal} transparent={true} animationType='fade' visible={actionModalVisible} onRequestClose={()=>{}}>
                    <TouchableWithoutFeedback accessibilityLabel='imageActionModalbutton' onPress={()=>setActionModalVisible(false)}>
                        <View style={stylesScreen.folderActionModal}>
                            <View style={stylesScreen.modalContainer}>
                                <TouchableOpacity accessibilityLabel='renameImage' onPress={()=>{setActionModalVisible(false); setRenameModalVisible(true);}}>
                                    <Text style={stylesScreen.modalText}>Rename Image</Text>
                                </TouchableOpacity>
                                <TouchableOpacity accessibilityLabel='deleteImage' 
                                    onPress={()=> {setActionModalVisible(false); 
                                        Alert.alert('Do you want to delete image','',[
                                            {text: 'Cancel'},
                                            {text: "Yes", onPress: ()=>deleteimage(modelImage._id)}
                                        ],{cancelable:false})}}>
                                    <Text style={stylesScreen.modalText}>Delete Image</Text>
                                </TouchableOpacity>
                                {(shouldMove!==undefined)&&
                                <TouchableOpacity accessibilityLabel='moveImage' onPress={()=>setfolderListVisible(true)}>
                                    <Text style={stylesScreen.modalText}>Move to Folder</Text>
                                </TouchableOpacity>}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>)}

                {(modelImage !== null) && (
                <FolderModal modalVisible={renameModal} setVisible={setRenameModalVisible} folderId={modelImage._id} setRefresh={setRefresh} actionType={'RenameImage'}/>
                )}

                {(modelImage !== null) && (
                <FolderList visible={folderList} setVisible={setfolderListVisible} fileId={modelImage._id} type={'Image'} setRefresh={setRefresh} setDetailsModal={setActionModalVisible}/>
                )}
        </View>
    )
}

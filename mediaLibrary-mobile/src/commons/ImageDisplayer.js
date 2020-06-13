import React, { useState } from 'react';
import {Text, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image, Modal, Alert} from 'react-native';
import {stylesScreen} from '../styles/allImageScreen';
import {ImageModal} from '../modals/ImageModal';
import {FolderModal} from '../modals/FolderModal';
import {deleteImage} from '../api/image';
import { FolderList } from '../modals/FolderList';
import { FontAwesome } from '@expo/vector-icons';

export const ImageDisplayer = ({setRefresh, images, count, shouldMove, type}) => {

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
                    {(val.accessList.length>1)&&
                    <FontAwesome name="slideshare" size={24} color="white" style={stylesScreen.iconBottom}/>
                    }
                </View>
            </TouchableOpacity>
        )
    })
    return(
        <View>
            {count===0 ? 
                (<View style={stylesScreen.noImageContainer}>
                    <Image source={require('../../assets/no_result.png')} style={[stylesScreen.originalImage]}/> 
                    <Text accessibilityLabel='noImage1' style={stylesScreen.noImageText}>No Images Found</Text>
                    {(type==='infolder')&&
                        <View><Text style={stylesScreen.noImageTextB}>Images uploading to this folder</Text>
                        <Text style={stylesScreen.noImageTextB}>will appear here</Text></View>
                    }
                    {(type==='fav')&&
                        <View><Text style={stylesScreen.noImageTextB}>Images added to the favourites</Text>
                        <Text style={stylesScreen.noImageTextB}>will appear here</Text></View>
                    }
                    {(type==='shared')&&
                        <View><Text style={stylesScreen.noImageTextB}>Images shared with/by others</Text>
                        <Text style={stylesScreen.noImageTextB}>will appear here</Text></View>
                    }
                    {(type==='search')&&
                        <View><Text style={stylesScreen.noImageTextB}>We cannot find image you are searching for,</Text>
                        <Text style={stylesScreen.noImageTextB}>may be a little spelling mistake</Text></View>
                    }
                </View>
                ):
                (<ScrollView style={stylesScreen.container}>
                    <View style={stylesScreen.container} accessibilityLabel='imagesView'>
                        {(modelImage !== null) && (
                            <View>
                            <ImageModal modelImage={modelImage} modelVisible={modelVisible} setVisible={setVisible} setRefresh={setRefresh} enableFolder={shouldMove} setImage={setImage} type={type}/>
                            
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
                            </Modal>

                            <FolderModal modalVisible={renameModal} setVisible={setRenameModalVisible} folderId={modelImage._id} setRefresh={setRefresh} actionType={'RenameImage'}/>
                            <FolderList visible={folderList} setVisible={setfolderListVisible} fileId={modelImage._id} type={'Image'} setRefresh={setRefresh} setDetailsModal={setActionModalVisible} setFileModal={setVisible} setFile={setImage}/>
                            </View>
                        )}
                        {imageSet}
                    </View>
                </ScrollView>)
            }

        </View>
    )
}

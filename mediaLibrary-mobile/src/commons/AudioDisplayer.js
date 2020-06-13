import React, {useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert, Image} from 'react-native';
import { AudioModal } from '../modals/AudioModal';
import {styleAudio} from '../styles/audioStyles';
import {stylesScreen} from '../styles/allImageScreen';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import {FolderModal} from '../modals/FolderModal';
import { FolderList } from '../modals/FolderList';
import {deleteAudio} from '../api/audio';

export const AudioDisplayer = ({setRefresh, audios, count, insideFolder, type}) => {
    const [audioModal, setAudioModal] = useState(null);
    const [visible, setVisible] = useState(false);
    const [index, setIndex] = useState(0);
    const [actionModalVisible, setActionModalVisible] = useState(false);
    const [renameModal, setRenameModalVisible] = useState(false);
    const [folderList, setfolderListVisible] = useState(false);
    
    async function openModal(visible,key){
        const id = (key+audios.length)%audios.length;
        await setIndex(id);
        await setAudioModal(audios[id]);
        setVisible(visible);
    }

    async function setAction(val){
        setActionModalVisible(true);
        await setAudioModal(val)
    }

    function deleteaudio(audioId){
        setAudioModal(null)
        deleteAudio({audioId: audioId})
        .then((response)=>{
            setRefresh(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const audioSet = audios.map((val,key)=>{
        return(
            <TouchableOpacity key={key} 
                onPress={()=>{openModal(true, key)}} 
                accessibilityLabel={val._id}
                onLongPress={()=> setAction(val)}
            >
                <View style={styleAudio.audioContainer}>
                    <MaterialIcons name='music-video' style={styleAudio.audioIcon}/>
                    <Text style={styleAudio.audioName}>{val.audioName.substring(0, 28)}</Text>
                    {(val.accessList.length>1)&&
                    <FontAwesome name="slideshare" size={24} color="white" style={styleAudio.iconBottom}/>
                    }
                </View>
            </TouchableOpacity>
        )
    })

    React.useEffect(()=>{  
        if (audioModal!==null){
            openModal(visible, index)
        }
    },[audios])

    
    return(
        <View>
            {count===0 ? 
                (<View style={styleAudio.noAudioContainer}>
                    <Image source={require('../../assets/no_result.png')} style={[styleAudio.originalImage]}/> 
                    <Text style={styleAudio.noAudioText} accessibilityLabel='noAudio'>No Audios Found</Text>
                    {(type==='infolder')&&
                        <View><Text style={styleAudio.noAudioTextB}>Audios uploading to this folder</Text>
                        <Text style={styleAudio.noAudioTextB}>will appear here</Text></View>
                    }
                    {(type==='fav')&&
                        <View><Text style={styleAudio.noAudioTextB}>Audios added to the favourites</Text>
                        <Text style={styleAudio.noAudioTextB}>will appear here</Text></View>
                    }
                    {(type==='shared')&&
                        <View><Text style={styleAudio.noAudioTextB}>Audios shared with/by others</Text>
                        <Text style={styleAudio.noAudioTextB}>will appear here</Text></View>
                    }
                    {(type==='search')&&
					<View><Text style={styleAudio.noAudioTextB}>We cannot find audio you are searching for,</Text>
					<Text style={styleAudio.noAudioTextB}>may be a little spelling mistake</Text></View>
				    }
                </View>):
                (<ScrollView style={styleAudio.container} accessibilityLabel='audioView'>
                    <View style={styleAudio.container}>
                        {(audioModal !== null) && (
                        <View>
                        <AudioModal visible={visible} setVisible={setVisible} openModal={openModal} index={index} audio={audioModal} setRefresh={setRefresh} setAudioModal={setAudioModal} insideFolder={insideFolder} type={type}/>
                        
                        <Modal style={stylesScreen.folderActionModal} transparent={true} animationType='fade' visible={actionModalVisible} onRequestClose={()=>{setActionModalVisible(false)}}>
                            <TouchableWithoutFeedback accessibilityLabel='audioActionModalbutton' onPress={()=>setActionModalVisible(false)}>
                                <View style={stylesScreen.folderActionModal}>
                                    <View style={stylesScreen.modalContainer}>
                                        <TouchableOpacity accessibilityLabel='renameAudio' onPress={()=>{setActionModalVisible(false); setRenameModalVisible(true);}}>
                                            <Text style={stylesScreen.modalText}>Rename Audio</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity accessibilityLabel='deleteAudio' 
                                            onPress={()=> {setActionModalVisible(false); 
                                                Alert.alert('Do you want to delete audio','',[
                                                    {text: 'Cancel'},
                                                    {text: "Yes", onPress: ()=>deleteaudio(audioModal._id)}
                                                ],{cancelable:false})}}>
                                            <Text style={stylesScreen.modalText}>Delete Audio</Text>
                                        </TouchableOpacity>
                                        {(insideFolder!==undefined)&&
                                        <TouchableOpacity accessibilityLabel='moveAudio' onPress={()=>setfolderListVisible(true)}>
                                            <Text style={stylesScreen.modalText}>Move to Folder</Text>
                                        </TouchableOpacity>}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>

                        <FolderModal modalVisible={renameModal} setVisible={setRenameModalVisible} folderId={audioModal._id} setRefresh={setRefresh} actionType={'RenameAudio'}/>

                        <FolderList visible={folderList} setVisible={setfolderListVisible} fileId={audioModal._id} type={'Audio'} setRefresh={setRefresh} setDetailsModal={setActionModalVisible} setFileModal={setVisible} setFile={setAudioModal}/>

                        </View>
                        )}
                        {audioSet}
                    </View>
                </ScrollView>)
            }

            </View>    
    );
}



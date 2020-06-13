import React, {useState} from 'react';
import { Text, View, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, Alert, Image} from 'react-native';
import { VideoModal } from '../modals/VideoModal';
import { Foundation, FontAwesome } from '@expo/vector-icons';
import {styleVideo} from '../styles/videoStyles';
import {stylesScreen} from '../styles/allImageScreen';
import {FolderModal} from '../modals/FolderModal';
import { FolderList } from '../modals/FolderList';
import {deleteVideo} from '../api/video';
 
export const VideoDisplayer = ({videos, count, setRefresh, insideFolder, type}) => {
	const [videoModal, setVideoModal] = useState(null);
	const [visible, setVisible] = useState(false);
	const [index, setIndex] = useState(0);
	const [actionModalVisible, setActionModalVisible] = useState(false);
    const [renameModal, setRenameModalVisible] = useState(false);
	const [folderList, setfolderListVisible] = useState(false);
	let txt;
	if (type==='fav'){
		txt = 'Favourite'
	}

	async function openModal(visible,key){
		await setIndex(key);
        await setVideoModal(videos[key]);
        setVisible(visible);
	}

	async function setAction(val){
        setActionModalVisible(true);
        await setVideoModal(val)
    }

    function deletevideo(videoId){
        setVideoModal(null)
        deleteVideo({videoId: videoId})
        .then((response)=>{
            setRefresh(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
	
	React.useEffect(()=>{  
        if (videoModal!==null){
            openModal(visible, index)
        }
    },[videos])

	const videoSet = videos.map((val,key)=>{
		return(
			<TouchableOpacity 
				key={key} 
				onPress={()=>{openModal(true, key)}} 
				onLongPress={()=> setAction(val)}
				accessibilityLabel={val._id}
			>
                <View style={styleVideo.videoContainer}>
					<Foundation name='play-video' style={styleVideo.videoIcon} />
                    <Text style={styleVideo.videoName}>{val.videoName.substring(0, 28)}</Text>
					{(val.accessList.length>1)&&
                    <FontAwesome name="slideshare" size={24} color="white" style={styleVideo.iconBottom}/>
                    }
                </View>
            </TouchableOpacity>
        )
    })

return(
	<View>
		{count===0 ? 
			(<View style={styleVideo.noVideoContainer}>
				<Image source={require('../../assets/no_result.png')} style={[styleVideo.originalImage]}/> 
				<Text accessibilityLabel='noVideosFound' style={styleVideo.noVideoText}>No Videos Found</Text>
                {(type==='infolder')&&
					<View><Text style={styleVideo.noVideoTextB}>Videos uploading to this folder</Text>
					<Text style={styleVideo.noVideoTextB}>will appear here</Text></View>
				}
				{(type==='fav')&&
					<View><Text style={styleVideo.noVideoTextB}>Videos added to the favourites</Text>
					<Text style={styleVideo.noVideoTextB}>will appear here</Text></View>
				}
				{(type==='shared')&&
					<View><Text style={styleVideo.noVideoTextB}>Videos shared with/by others</Text>
					<Text style={styleVideo.noVideoTextB}>will appear here</Text></View>
				}
				{(type==='search')&&
					<View><Text style={styleVideo.noVideoTextB}>We cannot find video you are searching for,</Text>
					<Text style={styleVideo.noVideoTextB}>may be a little spelling mistake</Text></View>
				}
			</View>):
			(<ScrollView style={styleVideo.container}>
				<View style={styleVideo.container} accessibilityLabel='videoContainer'>
					{(videoModal !== null) && (
						<View>
						<VideoModal visible={visible} setVisible={setVisible} videoModal={videoModal} setRefresh={setRefresh} insideFolder={insideFolder} setVideoModal={setVideoModal} type={type}/>
						<Modal style={stylesScreen.folderActionModal} transparent={true} animationType='fade' visible={actionModalVisible} onRequestClose={()=>{setActionModalVisible(false)}}>
							<TouchableWithoutFeedback accessibilityLabel='videoActionModalbutton' onPress={()=>setActionModalVisible(false)}>
								<View style={stylesScreen.folderActionModal}>
									<View style={stylesScreen.modalContainer}>
										<TouchableOpacity accessibilityLabel='renameVideo' onPress={()=>{setActionModalVisible(false); setRenameModalVisible(true);}}>
											<Text style={stylesScreen.modalText}>Rename Video</Text>
										</TouchableOpacity>
										<TouchableOpacity accessibilityLabel='deleteVideo' 
											onPress={()=> {setActionModalVisible(false); 
												Alert.alert('Do you want to delete video','',[
													{text: 'Cancel'},
													{text: "Yes", onPress: ()=>deletevideo(videoModal._id)}
												],{cancelable:false})}}>
											<Text style={stylesScreen.modalText}>Delete Video</Text>
										</TouchableOpacity>
										{(insideFolder!==undefined)&&
										<TouchableOpacity accessibilityLabel='moveVideo' onPress={()=>setfolderListVisible(true)}>
											<Text style={stylesScreen.modalText}>Move to Folder</Text>
										</TouchableOpacity>}
									</View>
								</View>
							</TouchableWithoutFeedback>
						</Modal>
						
						<FolderModal modalVisible={renameModal} setVisible={setRenameModalVisible} folderId={videoModal._id} setRefresh={setRefresh} actionType={'RenameVideo'}/>
						
						<FolderList visible={folderList} setVisible={setfolderListVisible} fileId={videoModal._id} type={'Video'} setRefresh={setRefresh} setDetailsModal={setActionModalVisible} setFileModal={setVisible} setFile={setVideoModal}/>
						</View>
					)}
					{videoSet}
				</View>
			</ScrollView>)
		}

	</View>
);}


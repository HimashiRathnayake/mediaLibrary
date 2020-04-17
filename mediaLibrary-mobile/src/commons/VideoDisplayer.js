import React, {useState} from 'react';
import { Text, View, TouchableOpacity, ScrollView} from 'react-native';
import { VideoModal } from '../modals/VideoModal';
import { Foundation } from '@expo/vector-icons';
import {styleVideo} from '../styles/videoStyles';
 
export const VideoDisplayer = ({videos, count, setRefresh}) => {
	const [videoModal, setVideoModal] = useState(null);
	const [visible, setVisible] = useState(false);

	async function openModal(visible,key){
        await setVideoModal(videos[key]);
        setVisible(visible);
    }

	const videoSet = videos.map((val,key)=>{
		return(
            <TouchableOpacity key={key} onPress={()=>{openModal(true, key)}}>
                <View style={styleVideo.videoContainer}>
					<Foundation name='play-video' style={styleVideo.videoIcon} />
                    <Text style={styleVideo.videoName}>{val.videoName.substring(0, 34)}</Text>
                </View>
            </TouchableOpacity>
        )
    })

return(
	<View>
		{count===0 ? 
			(<View style={styleVideo.noVideoContainer}>
				<Text style={styleVideo.noVideoText}>No Videos found</Text>
			</View>):
			(<ScrollView style={styleVideo.container}>
				<View style={styleVideo.container}>
					{(videoModal !== null) && (
					<VideoModal visible={visible} setVisible={setVisible} videoModal={videoModal} setRefresh={setRefresh}/>
					)}
					{videoSet}
				</View>
			</ScrollView>)
		}
	</View>
);}


import React, {useState, useContext} from 'react';
import {ImageBackground, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from '../styles/commons';
import {Header} from '../commons/Header';
import { AuthContext } from '../navigators/context';
import { getVideos } from '../api/video';
import { VideoModal } from '../modals/VideoModal';
import { Foundation } from '@expo/vector-icons';
import {styleVideo} from '../styles/videoStyles';
import { VideoDisplayer } from '../commons/VideoDisplayer';
 
export const AllVideoScreen = ({navigation, route}) => {
	const [videoModal, setVideoModal] = useState(null);
	const [visible, setVisible] = useState(false);
	const {authContext,state} = useContext(AuthContext); 
	const [videos, setVideos] = useState([]);
	const [count, setCount] = useState(null);
	const [refresh, setRefresh] = useState(false);

	React.useEffect(()=>{  
        navigation.addListener('focus', ()=>{       
			setRefresh(true);
		})
		getVideos({token:state.userToken})
		.then((response)=>{
			console.log(response);
			setCount(response.count);
			setVideos(response.Videos);
		})
		.catch((error)=>{
			console.log(error)
		})
		setRefresh(false);
	},[refresh])
	
return(
	<ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
		<Header navigation={navigation}>Video</Header>
		<VideoDisplayer setRefresh={setRefresh} count={count} videos={videos}/>
	</ImageBackground>
);}


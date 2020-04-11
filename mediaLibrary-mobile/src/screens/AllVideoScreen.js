import React, {useState} from 'react';
import {ImageBackground} from 'react-native';
import {styles} from '../styles/commons';
import {Header} from '../commons/Header';
import { getVideos } from '../api/video';
import { VideoDisplayer } from '../commons/VideoDisplayer';
 
export const AllVideoScreen = ({navigation, route}) => {
	const [videos, setVideos] = useState([]);
	const [count, setCount] = useState(null);
	const [refresh, setRefresh] = useState(false);

	React.useEffect(()=>{  
        // navigation.addListener('focus', ()=>{       
		// 	setRefresh(true);
		// })
		getVideos()
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


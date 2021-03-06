import React, {useState, useContext} from 'react';
import {ImageBackground, Text, View, TouchableOpacity} from 'react-native';
import {styles} from '../styles/commons';
import {FileHeader} from '../commons/Header';
import {uploadVideo, getVideosInFolder} from '../api/video';
import * as DocumentPicker from 'expo-document-picker';
import {styleVideo} from '../styles/videoStyles';
import {VideoDisplayer} from '../commons/VideoDisplayer';
import { ProgressModal } from '../modals/ProgressModal';

export const VideoScreen = ({navigation, route}) => {

	const [videos, setVideos] = useState([]);
	const [count, setCount] = useState(null);
    const [refresh,setRefresh] = useState(false);
    const [progressBar, showProgress] = useState(false);

    React.useEffect(()=>{
        getVideosInFolder({folderId:route.params.folderId})
        .then((response)=>{
            setCount(response.count);
            setVideos(response.Videos);
        })
        .catch((error)=>{
            console.log(error)
        });
        setRefresh(false);
        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible:false,
        });
        return()=>
            parent.setOptions({
                tabBarVisible: true
        });
    },[refresh]);
    
    let openVideoPickerAsync = async () => {
        let pickerResult = await DocumentPicker.getDocumentAsync({type: 'video/*', copyToCacheDirectory:false});
        console.log(pickerResult)
        if (pickerResult.type === "success"){
            showProgress(true);
            let response = await uploadVideo({folderId:route.params.folderId, uri:pickerResult.uri, name:pickerResult.name})
            console.log(response)
            if (response.message == "Video uploaded successfully"){
                setRefresh(true);
                showProgress(false);
            }
            else{
                showProgress(false);
                alert('Something went wrong')
            }
        }
    } 

    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage} accessibilityLabel='videoScreen'>
            <FileHeader navigation={navigation} route={route}/>
            <View>
                <VideoDisplayer setRefresh={setRefresh} count={count} videos={videos} insideFolder={true} type='infolder'/>
                <View style={styleVideo.iconContainer}>
                    <TouchableOpacity accessibilityLabel='uploadVideo' onPress={()=>{openVideoPickerAsync()}}>
                        <Text style={styleVideo.addVideoIcon}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ProgressModal type='Uploading Video' visible={progressBar}/>
        </ImageBackground>       
    )
}

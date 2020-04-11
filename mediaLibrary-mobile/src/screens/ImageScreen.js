import React, { useState, useContext } from 'react';
import {ImageBackground, Text, View, TouchableOpacity} from 'react-native';
import {styles} from '../styles/commons';
import {FileHeader} from '../commons/Header';
import { AuthContext } from '../navigators/context';
import {stylesScreen} from '../styles/allImageScreen';
import {ImageDisplayer} from '../commons/ImageDisplayer';
import {getImagesInFolder, uploadImage} from '../api/image';
import * as ImagePicker from 'expo-image-picker';
import { ProgressModal } from '../modals/ProgressModal';

export const ImageScreen = ({navigation, route}) => {

    const [images, setImages] = useState([]);
    const [count, setCount] = useState(null);
    const [progressBar, showProgress] = useState(false);
    const [refresh,setRefresh] = useState(false);
    const {authContext,state} = useContext(AuthContext); 

    React.useEffect(()=>{
        getImagesInFolder({token:state.userToken, folderId:route.params.folderId})
        .then((response)=>{
            setCount(response.count);
            setImages(response.images);
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

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.Images});
        if (pickerResult.cancelled === false){
            showProgress(true);
            let response = await uploadImage({folderId:route.params.folderId, uri:pickerResult.uri, token:state.userToken, type:pickerResult.uri.split('.')[-1]})
            console.log(response)
            if (response.message == "Image uploaded successfully"){
                setRefresh(true);
                showProgress(false);
            }
            else{
                showProgress(false);
                alert('Something went wrong');
            }
        }
    }
    
    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <FileHeader navigation={navigation} route={route}/>
            <View>
                <ImageDisplayer setRefresh={setRefresh} images={images} count={count}/>
                <View style={stylesScreen.iconContainer}>
                    <TouchableOpacity onPress={()=>{openImagePickerAsync()}}>
                        <Text style={stylesScreen.addImageIcon}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ProgressModal type='Uploading Image' visible={progressBar}/>
        </ImageBackground>       
    )
}

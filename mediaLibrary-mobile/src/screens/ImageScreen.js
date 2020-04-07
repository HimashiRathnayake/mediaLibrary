import React from 'react';
import {ImageBackground, Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {styles} from '../styles/commons';
import {FileHeader} from '../commons/Header';
import { AuthContext } from '../navigators/context';
import {stylesScreen} from '../styles/allImageScreen';
import {ImageModal} from '../modals/ImageModal';
import {getImagesInFolder, uploadImage} from '../api/image';
import * as ImagePicker from 'expo-image-picker';

export const ImageScreen = ({navigation, route}) => {

    const [modelVisible, setVisible] = React.useState(false);
    const [modelImage, setImage] = React.useState(require('../../assets/logo.png'));
    const [images, setImages] = React.useState([]);
    const [count, setCount] = React.useState(null);
    const [refresh,setRefresh] = React.useState(false);
    const {authContext,state} = React.useContext(AuthContext); 

    React.useEffect(()=>{
        getImagesInFolder({token:state.userToken, folderId:route.params.folderId})
        .then((response)=>{
            setCount(response.count);
            setImages(response.images);
        })
        .catch((error)=>{
            console.log(error)
        });
        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible:false,
        });
        return()=>
            parent.setOptions({
                tabBarVisible: true
        });
    },[refresh]);
    
    function setModelVisible(visible, imageKey){
        setImage(images[imageKey]);
        setVisible(visible);
    }

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({mediaTypes: ImagePicker.MediaTypeOptions.Images});
        if (pickerResult.cancelled === false){
            let response = await uploadImage({folderId:route.params.folderId, uri:pickerResult.uri, token:state.userToken, type:pickerResult.uri.split('.')[-1]})
                console.log(response)
                if (response.message == "Image uploaded successfully"){
                    setRefresh(true);
                }
                else{alert('Something went wrong')}
        }
    }
    
    const imageSet = images.map((val,key)=>{
        return(
            <TouchableOpacity key={key} onPress={()=>{setModelVisible(true, key)}}>
                <View style={stylesScreen.imagewrapper}>
                    <Image source={{uri:val.path}} style={stylesScreen.image}/>
                </View>
            </TouchableOpacity>
        )
    })
    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <FileHeader navigation={navigation} route={route}/>
            {count===0 ? 
                (<View style={stylesScreen.noImageContainer}>
                    <Text style={stylesScreen.noImageText}>No images found</Text>
                    <Text style={stylesScreen.noImageText}>Add new Image</Text>
                    <TouchableOpacity onPress={()=>{openImagePickerAsync()}}>
                        <View>
                            <MaterialIcons name='add-to-photos' style={stylesScreen.addImageIcon}/>
                        </View>
                    </TouchableOpacity>
                </View>
                ):
                (<ScrollView style={stylesScreen.container}>
                    <View style={stylesScreen.container}>
                        <ImageModal modelImage={modelImage} modelVisible={modelVisible} setVisible={setVisible}/>
                        <TouchableOpacity onPress={()=>{openImagePickerAsync()}}>
                            <View style={stylesScreen.imagewrapper}>
                                <MaterialIcons name='add-to-photos' style={stylesScreen.imageIcon}/>
                                <Text style={stylesScreen.imagename}>Add Image</Text>
                            </View>
                        </TouchableOpacity>
                        {imageSet}
                    </View>
                </ScrollView>)
            }
        </ImageBackground>       
    )
}

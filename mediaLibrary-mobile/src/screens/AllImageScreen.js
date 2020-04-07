import React from 'react';
import {ImageBackground, Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import {styles} from '../styles/commons';
import {Header} from '../commons/Header';
import {getImages} from '../api/image';
import {ImageModal} from '../modals/ImageModal';
import { AuthContext } from '../navigators/context';
import {stylesScreen} from '../styles/allImageScreen';

export const AllImageScreen = ({navigation, route}) => {
    const [modelVisible, setVisible] = React.useState(false);
    const [modelImage, setImage] = React.useState(require('../../assets/logo.png'));
    const [images, setImages] = React.useState([]);
    const [count, setCount] = React.useState(null);
    const {authContext,state} = React.useContext(AuthContext); 

    React.useEffect(()=>{  
        navigation.addListener('focus', ()=>{
            getImages({token:state.userToken})
            .then((response)=>{
                if (response.message != undefined && response.message==="Auth failed"){
                    authContext.signOut();
                }
                setCount(response.count);
                setImages(response.Images); 
            })
            .catch((error)=>{
                console.log(error)
            })
        })
    },[navigation])

    function setModelVisible(visible, imageKey){
        setImage(images[imageKey]);
        setVisible(visible);
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
            <Header navigation={navigation}>Image</Header>
            {count===0 ? 
                (<View style={stylesScreen.noImageContainer}>
                    <Text style={stylesScreen.noImageText}>No images found</Text>
                </View>):
                (<ScrollView style={stylesScreen.container}>
                    <View style={stylesScreen.container}>
                        <ImageModal modelImage={modelImage} modelVisible={modelVisible} setVisible={setVisible}/>
                        {imageSet}
                    </View>
                </ScrollView>)
            }
        </ImageBackground>       
    )
} 
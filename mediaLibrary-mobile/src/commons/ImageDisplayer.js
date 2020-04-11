import React from 'react';
import {Text, View, ScrollView, TouchableOpacity, Image} from 'react-native';
import {stylesScreen} from '../styles/allImageScreen';
import {ImageModal} from '../modals/ImageModal';

export const ImageDisplayer = ({setRefresh, images, count}) => {

    const [modelVisible, setVisible] = React.useState(false);
    const [modelImage, setImage] = React.useState(require('../../assets/logo.png'));

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
        <View>
            {count===0 ? 
                (<View style={stylesScreen.noImageContainer}>
                    <Text style={stylesScreen.noImageText}>No images found</Text>
                </View>
                ):
                (<ScrollView style={stylesScreen.container}>
                    <View style={stylesScreen.container}>
                        <ImageModal modelImage={modelImage} modelVisible={modelVisible} setVisible={setVisible} setRefresh={setRefresh}/>
                        {imageSet}
                    </View>
                </ScrollView>)
            }
        </View>
    )
}

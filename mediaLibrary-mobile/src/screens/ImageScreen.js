import React from 'react';
import {ImageBackground, Text, View, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Modal} from 'react-native';
import {styles} from '../styles/commons';
import {Header} from '../commons/Header';
import {ImageElement} from '../components/ImageElement';
import {imagesAll} from '../api/images';
import {ImageModal} from '../modals/ImageModal';

export const ImageScreen = ({navigation, route}) => {
    const [modelVisible, setVisible] = React.useState(false);
    const [modelImage, setImage] = React.useState(require('../../assets/logo.png'));
    const images=imagesAll;

    function setModelVisible(visible, imageKey){
        setImage(images[imageKey]);
        setVisible(visible);
    }
    
    const imageSet = images.map((val,key)=>{
        return(
            <TouchableOpacity key={key} onPress={()=>{setModelVisible(true, key)}}>
                <View style={stylesScreen.imagewrapper}>
                    <ImageElement src={val.src}/>
                    <Text style={stylesScreen.imagename}>Image</Text>
                </View>
            </TouchableOpacity>
        )
    })
    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            {route.params===undefined && <Header navigation={navigation}>Image</Header>||<Header navigation={navigation}>{route.params.folderName}</Header>}
            <ScrollView style={stylesScreen.container}>
                <View style={stylesScreen.container}>
                    <ImageModal modelImage={modelImage} modelVisible={modelVisible} setVisible={setVisible}/>
                    {imageSet}
                </View>
            </ScrollView>
        </ImageBackground>       
    )
}

const stylesScreen = StyleSheet.create({
    container:{
        marginTop: 10,
        width: Dimensions.get('screen').width,
        flexDirection:'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        marginBottom: 120
    },
    imagewrapper:{
        margin: 5,
        borderRadius: 30,
        width: null,
        alignSelf: 'stretch',
        resizeMode: 'contain',
        height: 140,
        width: 110,
        borderRadius: 30,
    },
    imagename:{
        alignSelf: 'center',
        color: 'white'
    },
});
import React from 'react';
import {ImageBackground, Text, View, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Modal} from 'react-native';
import {styles} from '../styles/commons';
import {Header} from '../commons/Header';
import {ImageElement, OriginalImageElement} from '../components/ImageElement';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import {imagesAll} from '../api/images';
import { DetailsText } from '../commons/DetailsText';

export const ImageScreen = ({navigation, route}) => {
    const [modelVisible, setVisible] = React.useState(false);
    const [modelImage, setImage] = React.useState(require('../../assets/logo.png'));
    const [detailsModal, setDetailsModal] = React.useState(false);
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
                    <Modal style={stylesScreen.modal} transparent={false} animationType='fade' visible={modelVisible} onRequestClose={()=>{}}>
                        <View style={stylesScreen.modal}>
                            <View flexDirection= 'row-reverse'>
                                <Entypo name='dots-three-vertical' style={stylesScreen.icon} onPress={()=>setDetailsModal(true)}/>
                                <MaterialCommunityIcons name='delete-outline' style={stylesScreen.icon} onPress={()=>setVisible(false)}/>
                                <MaterialIcons name='favorite-border' style={stylesScreen.icon} onPress={()=>setVisible(false)}/>
                                <Ionicons name='md-share' style={stylesScreen.icon} onPress={()=>setVisible(false)}/>
                                <AntDesign name='left' style={stylesScreen.iconLeft} onPress={()=>setVisible(false)}/>
                            </View>
                            <OriginalImageElement src={modelImage.src}></OriginalImageElement>
                        </View>
                        <Modal style={stylesScreen.modal} transparent={false} animationType='fade' visible={detailsModal} onRequestClose={()=>{}}>
                            <View style={stylesScreen.modal}>
                                <View flexDirection= 'row'>
                                    <AntDesign name='left' style={stylesScreen.back} onPress={()=>setDetailsModal(false)}/>
                                    <Text style={stylesScreen.text}>Details</Text>
                                </View>
                                <View style={stylesScreen.details}>
                                    <DetailsText name={'Image Name'}>{modelImage.imageName}</DetailsText>
                                    <DetailsText name={'Title'}>{modelImage.title}</DetailsText>
                                    <DetailsText name={'Subject'}>{modelImage.subject}</DetailsText>
                                    <DetailsText name={'Artist'}>{modelImage.artist}</DetailsText>
                                </View>
                            </View>
                        </Modal>
                    </Modal>
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
    modal: {
         flex:1,
         padding: 0,
         backgroundColor: 'black',
         color: '#fff'
    },
    icon: {
        color: '#fff',
        fontSize: 20,
        paddingHorizontal: 15,
        paddingTop: 5,
    },
    iconLeft:{
        color: '#fff',
        fontSize: 20,
        paddingRight: 120,
        paddingTop: 5,
    },
    back:{
        color: '#fff',
        fontSize: 20,
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 10,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        marginRight: 200,
        paddingTop: 5
    },
    details: {
        marginTop: 140,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height/2,
    }
});
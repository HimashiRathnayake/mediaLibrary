import React from 'react';
import {ImageBackground, Text, View, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Modal} from 'react-native';
import {styles} from '../styles/commons';
import {Header} from '../commons/Header';
import {ImageElement, OriginalImageElement} from '../components/ImageElement';
import { TouchableWithoutFeedback, TouchableHighlight } from 'react-native-gesture-handler';
import { FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';

export const ImageScreen = ({navigation}) => {
    const [modelVisible, setVisible] = React.useState(false);
    const [modelImage, setImage] = React.useState(require('../../assets/logo.png'));
    const [detailsModal, setDetailsModal] = React.useState(false);
    const images = [
        require('../../assets/flower.jpg'),
        require('../../assets/logo.png'),
        require('../../assets/logo.png'),
        require('../../assets/logo.png'),
        require('../../assets/logo.png'),
        require('../../assets/logo.png'),
        require('../../assets/logo.png'),
        require('../../assets/logo.png'),
        require('../../assets/logo.png'),
        require('../../assets/logo.png'),
        require('../../assets/logo.png'),
        require('../../assets/logo.png'),
        require('../../assets/logo.png'),
        require('../../assets/logo.png'),
        require('../../assets/logo.png'),
    ];

    function toggleModal(){
        setDetailsModal({detailsModal:!detailsModal});
    }
    function setModelVisible(visible, imageKey){
        setImage(images[imageKey]);
        setVisible(visible);
    }
    
    const imageSet = images.map((val,key)=>{
        return(
            <TouchableOpacity key={key} onPress={()=>{setModelVisible(true, key)}}>
                <View style={stylesScreen.imagewrapper}>
                    <ImageElement src={val}/>
                    <Text style={stylesScreen.imagename}>Image</Text>
                </View>
            </TouchableOpacity>
        )
    })
    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <Header navigation={navigation}>Image</Header>
            <ScrollView style={stylesScreen.container}>
                <View style={stylesScreen.container}>
                    <Modal style={stylesScreen.modal} transparent={false} animationType='fade' visible={modelVisible} onRequestClose={()=>{}}>
                        <View style={stylesScreen.modal}>
                            <View flexDirection= 'row-reverse'>
                                <Entypo name='dots-three-vertical' style={stylesScreen.icon} onPress={()=>setDetailsModal(true)}/>
                                <MaterialCommunityIcons name='delete-outline' style={stylesScreen.icon} onPress={()=>setModelVisible(false)}/>
                                <MaterialIcons name='favorite-border' style={stylesScreen.icon} onPress={()=>setModelVisible(false)}/>
                                <Ionicons name='md-share' style={stylesScreen.icon} onPress={()=>setModelVisible(false)}/>
                                <AntDesign name='left' style={stylesScreen.iconLeft} onPress={()=>setModelVisible(false)}/>
                            </View>
                            <OriginalImageElement src={modelImage}></OriginalImageElement>
                        </View>
                    </Modal>
                    <Modal style={stylesScreen.modal} transparent={false} animationType='fade' visible={detailsModal} onRequestClose={()=>{}}>
                        <View style={stylesScreen.modal}>
                            <View flexDirection= 'row'>
                                <AntDesign name='left' style={stylesScreen.back} onPress={()=>setDetailsModal(false)}/>
                                <Text style={stylesScreen.text}>Details</Text>
                            </View>
                        </View>
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
        paddingRight: 10,
        paddingTop: 5,
    },
    text: {
        color: '#fff',
        fontSize: 18,
        marginRight: 200
    }
});
import React from 'react';
import {Text, View, StyleSheet, Modal, Dimensions} from 'react-native';
import {Ionicons, MaterialIcons, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import {DetailsText } from '../commons/DetailsText';
import {OriginalImageElement} from '../components/ImageElement';


export const ImageModal = ({modelImage, modelVisible, setVisible}) => {
    const [detailsModal, setDetailsModal] = React.useState(false);

    return(
        <Modal style={stylesScreen.modal} transparent={false} animationType='fade' visible={modelVisible} onRequestClose={()=>{}}>
            <View style={stylesScreen.modal}>
                <View flexDirection= 'row-reverse'>
                    <Entypo name='dots-three-vertical' style={stylesScreen.icon} onPress={()=>setDetailsModal(true)}/>
                    <MaterialCommunityIcons name='delete-outline' style={stylesScreen.icon} onPress={()=>setVisible(false)}/>
                    <MaterialIcons name='favorite-border' style={stylesScreen.icon} onPress={()=>setVisible(false)}/>
                    <Ionicons name='md-share' style={stylesScreen.icon} onPress={()=>setVisible(false)}/>
                    <AntDesign name='left' style={stylesScreen.iconLeft} onPress={()=>setVisible(false)}/>
                </View>
                <OriginalImageElement src={modelImage.path}></OriginalImageElement>
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
    );
}

const stylesScreen = StyleSheet.create({
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
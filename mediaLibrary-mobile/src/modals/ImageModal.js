import React from 'react';
import {Text, View, Modal, Image} from 'react-native';
import {Ionicons, MaterialIcons, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import {DetailsText } from '../commons/DetailsText';
import {stylesScreen} from '../styles/modals/image';

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
                <Image source={{uri:modelImage.path}} style={stylesScreen.originalImage}/>
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

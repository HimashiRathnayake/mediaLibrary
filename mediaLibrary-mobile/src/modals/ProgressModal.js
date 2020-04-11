import React from 'react';
import {Text, View, ProgressBarAndroid, Dimensions, Modal, StyleSheet} from 'react-native';

export const ProgressModal = ({visible, setVisible, type}) => {
    return(
        <Modal transparent={true} animationType='fade' visible={visible} onRequestClose={()=>{}}>
            <View style={styleProgress.modal}>
                <Text style={styleProgress.text}>{type}</Text>
                <ProgressBarAndroid styleAttr='Horizontal' style={styleProgress.progressBar}/>
            </View>
        </Modal>    
    );
}

const styleProgress = StyleSheet.create({
    modal:{
        alignSelf: 'center',
        width: Dimensions.get('screen').width-40,
        height:120,
        backgroundColor:'white',
        marginTop: Dimensions.get('screen').height-160,
        borderRadius: 20,
        justifyContent: 'center'
    },
    progressBar: {
        width: Dimensions.get('screen').width - 120, 
        alignSelf:'center',
        marginTop: 0 ,
        color: '#1976d2'
    },
    text: {
        alignSelf: 'center',
        marginBottom: 20,
        fontSize: 16
    }
})

import React from 'react';
import {Text, View, Dimensions, Modal,TouchableOpacity, StyleSheet} from 'react-native';

export const AlertModal = ({visible, header, content, onCancel, onOk}) => {
    return(
        <Modal style={styleAlert.modal} transparent={true} animationType='fade' visible={visible} onRequestClose={()=>{}}>
            <View style={styleAlert.modal}>
                <View style={styleAlert.modalView}>
                    <Text style={styleAlert.header}>{header}</Text>
                    <Text style={styleAlert.text}>{content}</Text>
                    <View flexDirection = 'row'>
                        <View style={styleAlert.bottom}>
                            <TouchableOpacity onPress={()=>onCancel()}>
                                <Text style={styleAlert.submit}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{marginTop: 5, color:'rgba(0,0,0,0.2)', fontSize:22, fontWeight:'bold'}}>|</Text>
                        <View style={styleAlert.bottom}>
                            <TouchableOpacity onPress={()=>onOk()}>
                                <Text style={styleAlert.submit}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>    
    );
}

const styleAlert = StyleSheet.create({
    modal:{
        alignSelf: 'center',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingBottom: 50
    },
    modalView: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: Dimensions.get('screen').width - 20,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    header:{
        marginBottom: 20,
        marginTop: 20,
        fontSize: 19,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    text: {
        marginBottom: 20,
        fontSize: 16,
        marginLeft: 20,
    },
    bottom: {
        width: (Dimensions.get('screen').width - 20)/2,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    submit:{
        fontSize: 18,
        fontWeight: 'bold'
    }
})

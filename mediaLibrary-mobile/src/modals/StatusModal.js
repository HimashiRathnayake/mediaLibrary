import React, { useState } from 'react';
import { StyleSheet, Modal, View, Dimensions } from 'react-native';

export const StatusModal = ({visible, setVisible, content}) => {
    return(
    <Modal style={styles.modal} transparent={true} animationType='slide'  visible={visible} onRequestClose={()=>{setVisible(false)}}>
        <View style={styles.modal}>

        </View>
    </Modal>);
}

const styles = StyleSheet.create({
    modal:{
        backgroundColor: 'rgba(128,128,127,0.6)',
        opacity: 0.8,
        height: 50,
        borderRadius: 30,
        width: Dimensions.get('screen').width/2,
        alignSelf: 'center',
        marginTop: Dimensions.get('screen').height - 100
    }
});
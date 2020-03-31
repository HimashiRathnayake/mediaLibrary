import React from 'react';
import {ImageBackground, Text, View, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Modal, TextInput} from 'react-native';
import {Header} from '../commons/Header';
import {styles} from '../styles/commons';
import {folder} from '../api/images';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export const FolderScreen = ({route,navigation}) => {
    const [modelVisible, setVisible] = React.useState(false);
    const [newFolderName, setName]=React.useState('untitled');
    const type=route.params.type;
    const folderSet = folder.map((val,key) => {
        return(
            <TouchableOpacity key={key} onPress={()=>{navigation.push('FolderImages',{visible:false, folderId:val._id, folderName: val.folderName})}}>
                <View style={stylesScreen.folderWrapper}>
                    <MaterialIcons name='folder' style={stylesScreen.folderIcon}/>
                    <Text style={stylesScreen.folderName}>{val.folderName}</Text>
                </View>
            </TouchableOpacity>
        )
    });

    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <Header navigation={navigation}>{type} Folders</Header>
            <ScrollView style={stylesScreen.container}>
                <View style={stylesScreen.container}>
                    <TouchableOpacity onPress={()=>{setVisible(true)}}>
                        <View style={stylesScreen.folderWrapper}>
                            <MaterialIcons name='create-new-folder' style={stylesScreen.folderIcon}/>
                            <Text style={stylesScreen.folderName}>Create Folder</Text>
                        </View>
                    </TouchableOpacity>
                    {folderSet}
                    <Modal style={stylesScreen.modal} transparent={true} animationType='fade' visible={modelVisible} onRequestClose={()=>{}}>
                        <View style={stylesScreen.modal}>
                            <View style={stylesScreen.modalView}>
                                <Text style={stylesScreen.inputHeader}>Folder Name</Text>
                                <TextInput style={stylesScreen.input} placeholder='Folder' placeholderTextColor="#9e9e9e" onChangeText={(text)=>setName(text)}/>
                                <View style={stylesScreen.bottom}>
                                    <TouchableOpacity onPress={()=>{setVisible(false)}}><Text style={stylesScreen.text}>Close</Text></TouchableOpacity> 
                                    <TouchableOpacity onPress={()=>{setVisible(false); console.log(newFolderName);}}><Text style={stylesScreen.text}>Create</Text></TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
        </ImageBackground>
    );
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
    folderWrapper: {
        width: 110,
        marginLeft: 10,
        justifyContent: 'center'
    },
    folderIcon: {
        fontSize: 100,
        color: '#9e9e9e',
        alignSelf: 'center'
    },
    folderName: {
        color: '#fff',
        alignSelf: 'center'
    },
    modal: {
        flex:1,
        padding: 0,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    modalView: {
        height: 200,
        marginTop: 200,
        alignSelf: 'center',
        backgroundColor: 'white',
        width: Dimensions.get('screen').width-40,
        borderRadius: 20
    },
    input: {
        width: Dimensions.get('screen').width-80,
        alignSelf: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    inputHeader:{
        marginTop: 40,
        marginLeft: 20,
        marginBottom: 20,
        fontSize: 18,
        fontWeight: 'bold'
    },
    bottom:{
        flex: 1,
        top: 50,
        width: Dimensions.get('screen').width-40,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        fontSize: 16,
    }
});
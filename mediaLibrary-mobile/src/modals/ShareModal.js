import React, {useState} from 'react';
import {Text, View, Modal, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import {stylesScreen} from '../styles/modals/details';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {getOtherUsers} from '../api/user';
import {shareFile} from '../api/share';
import { ScrollView } from 'react-native-gesture-handler';

export const ShareModal = ({shareModal, setShareModal, type, fileId}) => {

    const[users, setUsers] = useState([]);

    function getUsers(text){
        if (text===''){
            setUsers([]);
        }
        else{
            getOtherUsers(text)
            .then((response)=>{
                setUsers(response.Users);
            })
            .catch((error)=>{
                console.log(error)
            });
        }
    }

    function sharefile(userId){
        shareFile(userId, type, fileId)
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        })

    }

    const userSet = users.map((val,key)=>{
        return(
            <View style={stylesScreen.userContainer} key={key}>
                <TouchableOpacity onPress={()=>sharefile(val._id)}>
                    <View flexDirection='row'>
                        <FontAwesome name='user-circle' style={stylesScreen.userIcon}/>
                        <Text style={stylesScreen.userName}>{val.email.substring(0, 32)}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    })

    return(
        
        <Modal style={stylesScreen.shareModal} transparent={true} animationType='slide' visible={shareModal} onRequestClose={()=>{setShareModal(false);setUsers([]);}}>
            <View style={stylesScreen.shareModal}>
                <View style={stylesScreen.shareView}>
                    <View flexDirection='row' style={stylesScreen.detailsHeader}>
                        <TouchableOpacity 
                            onPress={()=>{setShareModal(false); setUsers([]);}} 
                            style={{marginLeft: 20, marginTop:12}}
                        >
                            <Ionicons name='md-arrow-back' style={stylesScreen.icon}/>  
                        </TouchableOpacity>
                        <Text style={{fontWeight: 'bold', fontSize:20, marginTop:15, marginLeft:20}}>Share </Text>
                    </View>
                    <View style={stylesScreen.inputContainer}> 
                        <Ionicons name="md-person-add" style={stylesScreen.inputIcon}/>  
                        <TextInput 
                            style={stylesScreen.input}
                            placeholder='Add Person'
                            placeholderTextColor="rgba(52,52,52,0.9)"
                            underlineColorAndroid="transparent"
                            keyboardType='default'
                            onChangeText={(text)=>getUsers(text)}
                        />
                    </View>
                    <ScrollView style={{marginBottom: 50}}>
                        {userSet}
                    </ScrollView>
                </View>
            </View>
        </Modal>

);
}
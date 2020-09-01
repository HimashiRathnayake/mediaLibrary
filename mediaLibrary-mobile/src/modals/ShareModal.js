import React, {useState} from 'react';
import {Text, View, Modal, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import {stylesScreen} from '../styles/modals/details';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {getOtherUsers} from '../api/user';
import {shareFile} from '../api/share';
import { ScrollView } from 'react-native-gesture-handler';

export const ShareModal = ({shareModal, setShareModal, type, fileId, setRefresh, message, setMessage}) => {

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
        setMessage('Sharing file .... ');
        shareFile(userId, type, fileId)
        .then((response)=>{
            if (response.message === 'Already Shared'){
                alert('Already Shared');
                setTimeout(()=>setMessage(null), 500);
            }
            else{
                setRefresh(true);
                setTimeout(()=>setMessage('Shared successfully.'), 1200);
                setTimeout(()=>setMessage(null), 1500);
            }
        })
        .catch((error)=>{
            console.log(error);
        })

    }

    const userSet = users.map((val,key)=>{
        return(
            <View key={key}>
                <TouchableOpacity accessibilityLabel={val._id} onPress={()=>{
                    sharefile(val._id);
                    setShareModal(false); setUsers([]);
                }}>
                    <View style={stylesScreen.userContainer}>
                        <View flexDirection='row'>
                            <FontAwesome name='user-circle' style={stylesScreen.userIcon}/>
                            <Text style={stylesScreen.email}>{val.email.substring(0, 31)}</Text>
                        </View>
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
                            accessibilityLabel='back2'
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
                            accessibilityLabel='user'
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
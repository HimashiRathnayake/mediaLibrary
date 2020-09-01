import React, {useState} from 'react';
import {Text, View, Modal, TouchableOpacity, TextInput, Image, Alert} from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import {stylesScreen} from '../styles/modals/details';
import { ScrollView } from 'react-native-gesture-handler';
import {ShareModal} from './ShareModal';
import {removeUser} from '../api/share';
import { FolderList } from './FolderList';
import { ToolTip } from '../commons/ToolTip';
import GestureRecognizer from 'react-native-swipe-gestures';

export const DetailsModal = ({file, type, detailsModal, setDetailsModal, setVisible, renameFile, setRefresh, enableFolder, setFile, message}) => {

    const [pressed, setPressed] = useState(false);
    const [shareModal, setShareModal] = useState(false);
    const [folderVisible, setFolderVisible] = useState(false);
    const[fileName, setFileName] = useState('');
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [subject, setSubject] = useState('');
    const [year, setYear] = useState('');
    const [name, setName] = useState(null);

    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };

    function removeFromShared(userId, fileId){
        removeUser(userId, fileId, type)
        .then((response)=>{
            console.log(response);
            setRefresh(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    React.useEffect(()=>{  
        setTitle(file.title); 
        setArtist(file.artist); 
        setAlbum(file.album);
        setSubject(file.subject); 
        if (year==='' && type==='Audio') {setYear('Unknown');} else{setYear(file.year);}
        if (type==='Audio'){setFileName(file.audioName); }
        else if (type==='Video'){setFileName(file.videoName)}
        else {setFileName(file.imageName)}        
    },[file])

    const userSet = file.accessList.map((val,key)=>{
        if (key===0){
            return(
                <View style={stylesScreen.userContainer} key={key} accessibilityLabel={val._id}>
                    <FontAwesome name='user-circle' style={stylesScreen.userIcon}/>
                    <Text style={stylesScreen.userName}>{val.email.substring(0, 25)}</Text>
                    <Text style={stylesScreen.owner}>Owner</Text>
                </View>
            )
        }else{
            return(
                <View style={stylesScreen.userContainer} key={key} accessibilityLabel={val._id}>
                    <FontAwesome name='user-circle' style={stylesScreen.userIcon}/>
                    <Text style={stylesScreen.userName}>{val.email.substring(0, 25)}</Text>
                    <TouchableOpacity onPress={()=>removeFromShared(val._id, file._id)}>
                        <MaterialIcons name='remove-circle' style={stylesScreen.removeIcon}/>
                    </TouchableOpacity>
                </View>
            )
        }
    })

    return(

        <GestureRecognizer
            onSwipeDown={(state) => setDetailsModal(false)}
            config={config}
        >
        <View accessibilityLabel='detailsModalView'>
        <Modal style={stylesScreen.modal} transparent={false} animationType='slide' visible={detailsModal} onRequestClose={()=>{setDetailsModal(false); setPressed(false);}}>
            <View style={stylesScreen.modal}>
                <View style={{backgroundColor:'#fff', flex:1, justifyContent:'center'}}>
                    <View flexDirection='row' style={stylesScreen.detailsHeader}>
                        <TouchableOpacity accessibilityLabel='back1' onPress={()=>{setDetailsModal(false); setPressed(false);}} style={{marginLeft: 20, marginTop:12}}>
                            <Ionicons name='md-arrow-back' style={stylesScreen.icon}/>  
                        </TouchableOpacity>
                        <Text style={{fontWeight: 'bold', fontSize:20, marginTop:15, marginLeft:20}}>Details: </Text>
                    </View>
                    <ScrollView>

                        {(type==='Image') && <View style={stylesScreen.coverContainer}>
                            <Image source={{uri: file.path}} style={stylesScreen.image}/>
                        </View>}

                        <View style={stylesScreen.detailsView}>
                            <View flexDirection='row'>
                                <Text style={stylesScreen.detailTextLeft}>{type} Name :</Text>
                                {pressed===false ? 
                                (<View accessibilityLabel='renameUnpressed' flexDirection='row'>
                                    <Text style={stylesScreen.detailTextRight}>{fileName}</Text>
                                    <ToolTip content='Rename File' onPress={()=>{setPressed(true);}} dark={false}>
                                        <AntDesign name='edit' style={stylesScreen.renameIcon}/>
                                    </ToolTip>
                                </View>):
                                (<View accessibilityLabel='renamePressed'>
                                    <View flexDirection='row'>
                                        <TextInput 
                                            style={stylesScreen.detailTextRight} 
                                            placeholder={fileName}
                                            onChangeText={(newName)=>setName(newName)}
                                            value={name}
                                            accessibilityLabel='newname'
                                            onSubmitEditing={()=>{setFileName(newName); renameFile(file._id, name); setPressed(false)}}
                                        />
                                    </View>
                                    <View flexDirection='row'>
                                        <TouchableOpacity accessibilityLabel='renamebutton' 
                                            onPress={()=>{
                                            if (name==='' || name===null){
                                                setPressed(false);
                                                Alert.alert('You have to enter a name in order to rename','',[{text:'OK'}]);
                                            }
                                            else{
                                                renameFile(file._id, name); 
                                                setFileName(name);
                                                setPressed(false)}}}
                                        >
                                            <Text style={stylesScreen.button}>Rename</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity accessibilityLabel='cancelbutton' onPress={()=>{setPressed(false);}}>
                                            <Text style={stylesScreen.button}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>)
                                }
                            </View>
                            {(title!=null) && <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Title :</Text><Text style={stylesScreen.detailTextRight}>{title}</Text></View>}
                            {(album!=null) && <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Album :</Text><Text style={stylesScreen.detailTextRight}>{album}</Text></View>}
                            {(subject!=null) && <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Subject :</Text><Text style={stylesScreen.detailTextRight}>{subject}</Text></View>}
                            {(artist!=null) && <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Artist :</Text><Text style={stylesScreen.detailTextRight}>{artist}</Text></View>}
                            {(year!=null) && <View flexDirection='row'><Text style={stylesScreen.detailTextLeft}>Year :</Text><Text style={stylesScreen.detailTextRight}>{year}</Text></View>}
                            {(file!=null) && (enableFolder===true) && <View flexDirection='row'>
                                <Text style={stylesScreen.detailTextLeft}>Folder :</Text>
                                <Text style={stylesScreen.detailTextRight}>{file.folder.folderName}</Text>
                                <TouchableOpacity accessibilityLabel='folderSet' onPress={()=>{setFolderVisible(true);}}>
                                    <MaterialCommunityIcons name='file-move' style={stylesScreen.renameIcon}/>
                                </TouchableOpacity>
                            </View>}
                        </View>
                            
                        <View style={{backgroundColor: 'white'}}>
                            <Text style={stylesScreen.accessText}>Who have access :</Text>
                            <TouchableOpacity accessibilityLabel='shareModalVisible' onPress={()=>setShareModal(true)}>
                                <View style={stylesScreen.userContainer}>
                                    <Ionicons name="md-person-add" style={stylesScreen.userIcon}/>
                                    <Text style={stylesScreen.userName}>Share with other users</Text>
                                </View>
                            </TouchableOpacity>
                            {userSet}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
        <Modal transparent={true} animationType='fade' visible={message!=null} onRequestClose={()=>{setDetailsModal(false); setPressed(false);}} style={stylesScreen.bottomBar}>
            <View style={stylesScreen.bottomBar}>
                <View style={{ alignItems: "center", marginTop: 24 }}>
                    <Text style={stylesScreen.msg}>{message}</Text>
                </View>
            </View>
        </Modal>
        <ShareModal shareModal={shareModal} setShareModal={setShareModal} type={type} fileId={file._id} setRefresh={setRefresh}/>
        <FolderList visible={folderVisible} setVisible={setFolderVisible} fileId={file._id} type={type} setRefresh={setRefresh} setDetailsModal={setDetailsModal} setFileModal={setVisible} setFile={setFile}/>
        </View>
        </GestureRecognizer>

);
}
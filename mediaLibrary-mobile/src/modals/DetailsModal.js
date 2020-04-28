import React, {useState} from 'react';
import {Text, View, Modal, TouchableOpacity, TextInput} from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import {stylesScreen} from '../styles/modals/details';
import { ScrollView } from 'react-native-gesture-handler';
import {ShareModal} from './ShareModal';

export const DetailsModal = ({file, type, detailsModal, setDetailsModal, renameFile, name, setName}) => {

    const [pressed, setPressed] = useState(false);
    const [shareModal, setShareModal] = useState(false);

    let fileName, title, artist, album, subject, year;
    title=file.title; artist=file.artist; album=file.album; subject=file.subject; year=file.year;
    if (type==='Audio'){fileName = file.audioName; }
    else if (type==='Video'){fileName = file.videoName; }
    else {fileName=file.imageName}

    const userSet = file.accessList.map((val,key)=>{
        return(
            <View style={stylesScreen.userContainer} key={key}>
                <FontAwesome name='user-circle' style={stylesScreen.userIcon}/>
                <Text style={stylesScreen.userName}>{val.email.substring(0, 32)}</Text>
                <TouchableOpacity onPress={()=>alert('user removed')}>
                    <MaterialIcons name='remove-circle' style={stylesScreen.removeIcon}/>
                </TouchableOpacity>
            </View>
        )
    })

    return(

        <View>
        <Modal style={stylesScreen.modal} transparent={false} animationType='slide' visible={detailsModal} onRequestClose={()=>{setDetailsModal(false); setPressed(false);}}>
            <View style={stylesScreen.modal}>
                <View style={{backgroundColor:'#fff', flex:1, justifyContent:'center'}}>
                    <View flexDirection='row' style={stylesScreen.detailsHeader}>
                        <TouchableOpacity onPress={()=>{setDetailsModal(false); setPressed(false);}} style={{marginLeft: 20, marginTop:12}}>
                            <Ionicons name='md-arrow-back' style={stylesScreen.icon}/>  
                        </TouchableOpacity>
                        <Text style={{fontWeight: 'bold', fontSize:20, marginTop:15, marginLeft:20}}>Details: </Text>
                    </View>
                    <ScrollView>
                        <View style={stylesScreen.detailsView}>
                            <View flexDirection='row'>
                                <Text style={stylesScreen.detailTextLeft}>{type} Name :</Text>
                                {pressed===false ? 
                                (<View flexDirection='row'>
                                    <Text style={stylesScreen.detailTextRight}>{name===null?fileName:name}</Text>
                                    <TouchableOpacity onPress={()=>setPressed(true)}>
                                        <AntDesign name='edit' style={stylesScreen.renameIcon}/>
                                    </TouchableOpacity>
                                </View>):
                                (<View>
                                    <View flexDirection='row'>
                                        <TextInput 
                                            style={stylesScreen.detailTextRight} 
                                            placeholder={fileName}
                                            onChangeText={(newName)=>setName(newName)}
                                            value={name}
                                        />
                                    </View>
                                    <View flexDirection='row'>
                                        <TouchableOpacity onPress={()=>{renameFile(file._id, name); setPressed(false)}}>
                                            <Text style={stylesScreen.button}>Rename</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>{setPressed(false); setName(null);}}>
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
                        </View>
                            
                        <View style={{backgroundColor: 'white'}}>
                            <Text style={stylesScreen.accessText}>Who have access :</Text>
                            <TouchableOpacity onPress={()=>setShareModal(true)}>
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
        <ShareModal shareModal={shareModal} setShareModal={setShareModal} type={type} fileId={file._id}/>
    
        </View>

);
}
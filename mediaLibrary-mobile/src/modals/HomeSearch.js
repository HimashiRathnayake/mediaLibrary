import React, { useState } from 'react';
import {Text, View, Modal, ImageBackground, TextInput, Dimensions, Picker, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {styles} from '../styles/commons';
import { searchOverall } from '../api/search';
import { ImageDisplayer } from '../commons/ImageDisplayer';
import { AudioDisplayer } from '../commons/AudioDisplayer';
import { VideoDisplayer } from '../commons/VideoDisplayer';

export const HomeSearch = ({visible, setVisible}) => {
    const [value, setValue] = useState('');
    const [selected, setSelected] = useState('image');
    const [criteria, setCriteria] = useState('title');
    const [refresh, setRefresh] = useState(false);
    const [files, setFiles] = useState([]);
    const [count, setCount] = useState(null);
    const [isLoading, setLoading] = useState(false);

    React.useEffect(()=>{
        function searchMediaFiles(){
            setLoading(true);
            if (value==''){
                setFiles(null);
                setCount(0);
                setLoading(false);
            }
            else{
                searchOverall(value, selected, criteria)
                .then((response)=>{
                    console.log(response)
                    setCount(response.count);
                    if (selected ==='image'){setFiles(response.Images);}
                    else if (selected ==='audio'){setFiles(response.Audios);}
                    else{setFiles(response.Videos);} 
                    setLoading(false);
                })
                .catch((error)=>{
                    console.log(error);
                    setLoading(false);
                })
            }
        }
        searchMediaFiles();
        setRefresh(false);
    },[selected, value, criteria, refresh])

    return(
        <Modal flex={1} transparent={false} animationType='fade' visible={visible} onRequestClose={()=>{}}>
            <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage} accessibilityLabel='homeSearch'>

                <View flexDirection='row' style={[styleHome.searchHeader, {marginTop:7}]}>
                    <Ionicons.Button name="md-arrow-back" underlayColor='transparent' backgroundColor="transparent" color="#fff" size={30} marginTop={3} marginLeft={10} onPress={()=>{setVisible(false); setValue('');}}/>  
                    <TextInput 
                        flexDirection='row' 
                        placeholder='Search'
                        style={{fontSize: 18, width: Dimensions.get('screen').width-220}}
                        placeholderTextColor="white"
                        underlineColorAndroid="transparent"
                        onChangeText={text=>{setValue(text);}}
                        value={value}
                        onFocus={()=>setVisible(true)}
                        accessibilityLabel='searchhometext'
                    />
                    <Picker 
                        mode='dropdown' 
                        style={{width: 130, height:40, alignSelf:'center', borderRadius: 50}}
                        selectedValue = {criteria}
                        onValueChange = {(item)=>{setCriteria(item); setValue('');}}
                        accessibilityLabel='picker'
                    >
                        <Picker.Item label="By Title" value="title"/>
                        <Picker.Item label="By Artist" value="artist"/>
                    </Picker>
                </View>

                <View style={styleHome.searchView}>
                    <TouchableOpacity accessibilityLabel='selectImage' disabled={isLoading} onPress={async()=>{await setFiles(null); setSelected('image');}}>
                        <Text style={[styleHome.criteria, selected==='image'?{borderBottomColor:'#1976d2', color:'#1976d2'}:{borderBottomColor:'transparent', color:'#fff'}]}>
                            Image
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity accessibilityLabel='selectAudio' disabled={isLoading} onPress={async()=>{await setFiles(null); setSelected('audio'); }}>
                        <Text style={[styleHome.criteria, selected==='audio'?{borderBottomColor:'#1976d2', color:'#1976d2'}:{borderBottomColor:'transparent', color:'#fff'}]}>
                            Audio
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity accessibilityLabel='selectVideo' disabled={isLoading} onPress={async()=>{await setFiles(null); setSelected('video');}}>
                        <Text style={[styleHome.criteria, selected==='video'?{borderBottomColor:'#1976d2', color:'#1976d2'}:{borderBottomColor:'transparent', color:'#fff'}]}>
                            Video
                        </Text>
                    </TouchableOpacity>
                </View>
                {selected==='image' && files!==null && <ImageDisplayer setRefresh={setRefresh} images={files} count={count} type='search'/>}
                {selected==='audio' && files!==null && <AudioDisplayer setRefresh={setRefresh} audios={files} count={count} type='search'/>}
                {selected==='video' && files!==null && <VideoDisplayer setRefresh={setRefresh} videos={files} count={count} type='search'/>}
            </ImageBackground>
        </Modal>
    );
}

const styleHome = StyleSheet.create({
    container: {
        alignContent: 'center',
        flex: 2
    },
    containerHeader:{
        marginLeft: 10,
        marginTop: 10,
        fontSize: 18,
        marginBottom: 60,
        alignSelf: 'center'
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        fontSize: 26
    },
    searchView:{
        marginTop: 20,
        flexDirection:'row',
        alignSelf: 'center',
    },
    criteria: {
        fontSize: 14,
        width: Dimensions.get('screen').width/3 - 30,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        marginHorizontal: 10,
        textAlign: 'center' 
    },
    searchHeader:{
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width : Dimensions.get('screen').width-30,
        alignSelf: 'center',
        borderRadius: 10,
        height: 50,
        marginTop: 30,
    },
});
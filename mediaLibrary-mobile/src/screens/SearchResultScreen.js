import React, {useState,useContext} from 'react';
import {ImageBackground, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, View} from 'react-native';
import {SearchHeader} from '../commons/Header';
import {styles} from '../styles/commons';
import { AuthContext } from '../navigators/context';
import {searchFiles} from '../api/search';
import { styleAudio } from '../styles/audioStyles';
import { AudioModal } from '../modals/AudioModal';

export const SearchResultScreen = ({route,navigation}) => {
    const [fileModal, setFileModal] = useState(null);
    const [visible, setVisible] = useState(false);
    const {authContext,state} = useContext(AuthContext); 
    const [files, setFiles] = useState([]);
    const [count, setCount] = useState(null);
    const type=route.params.type;

    React.useEffect(()=>{  
        navigation.addListener('focus', ()=>{
            searchFiles({token:state.userToken, type:route.params.type, title:route.params.values.title, album:route.params.values.album, artist:route.params.values.artist, year:route.params.values.year})
            .then((response)=>{
                console.log(response)
                setCount(response.count);
                if (type ==='Image'){setFiles(response.Images);}
                else if (type ==='Audio'){setFiles(response.Audios);}
                else{setFiles(response.Videos);} 
            })
            .catch((error)=>{
                console.log(error)
            })
        })
        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible:false,
        });
        return()=>
            parent.setOptions({
                tabBarVisible: true
        });
    },[navigation])

    async function openModal(visible,key){
        await setFileModal(files[key]);
        setVisible(visible);
    }

    const fileSet = files.map((val,key)=>{
        return(
            <TouchableOpacity key={key} onPress={()=>{openModal(true, key)}}>
                <View style={styleAudio.audioContainer}>
                    <Text style={styleAudio.audioName}>{val.audioName.substring(0, 45)}</Text>
                </View>
            </TouchableOpacity>
        )
    })

    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <SearchHeader navigation={navigation} route={route}/>
            {count===0 ? 
                (<View style={styleAudio.noAudioContainer}>
                    <Text style={styleAudio.noAudioText}>No {route.params.type}s found</Text>
                </View>):
                (<ScrollView style={styleAudio.container}>
                    <View style={styleAudio.container}>
                        {(fileModal !== null) && (
                        <AudioModal visible={visible} setVisible={setVisible} audio={fileModal}/>
                        )}
                        {fileSet}
                    </View>
                </ScrollView>)
            }

        </ImageBackground>
    );
}

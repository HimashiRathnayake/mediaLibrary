import React, { useState } from 'react';
import {ImageBackground, Text, View, TouchableOpacity} from 'react-native';
import {styles} from '../styles/favouriteScreen';
import {Header} from '../commons/Header';
import { getFavourites } from '../api/favorites';
import {ImageDisplayer} from '../commons/ImageDisplayer';
import {AudioDisplayer} from '../commons/AudioDisplayer';
import {VideoDisplayer} from '../commons/VideoDisplayer';

export const FavouritesScreen = ({navigation}) => {

    const [selected, setSelected] = useState('Image');
    const [files, setFiles] = useState([]);
    const [count, setCount] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setLoading] = useState(false);

    function getFavouriteFiles(type){
        setLoading(true);
        setFiles([]);
        getFavourites(type)
        .then((result)=>{
            if (type==='Image'){
                setFiles(result.imgfavourites);
                setCount(result.imgfavourites.length);
            }
            else if (type==='Audio'){
                setFiles(result.audfavourites);
                setCount(result.audfavourites.length);
            }else{
                setFiles(result.vidfavourites);
                setCount(result.vidfavourites.length);
            }
            setLoading(false);
        })
    }

    navigation.addListener('focus', ()=>{
        getFavouriteFiles(selected);
    });
        

    return(
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
        <Header navigation={navigation}>MyFavourites</Header>
        
        <View flexDirection='row'>
            
            <View flexDirection='row' style={styles.header}>
                <TouchableOpacity disabled={isLoading} onPress={()=>{setSelected('Image'); getFavouriteFiles('Image')}}>
                    <Text style={[styles.headerText, selected==='Image' ? {borderBottomColor:'#1976d2', color:'#1976d2'}:{borderBottomColor:'transparent', color:'#fff'}]}>Images</Text>
                </TouchableOpacity>
            </View>
            
            <View flexDirection='row' style={styles.header}>
                <TouchableOpacity disabled={isLoading} onPress={()=>{setSelected('Audio'); getFavouriteFiles('Audio')}}>
                    <Text style={[styles.headerText, selected==='Audio' ? {borderBottomColor:'#1976d2', color:'#1976d2'}:{borderBottomColor:'transparent', color:'#fff'}]}>Audios</Text>
                </TouchableOpacity>
            </View>

            <View flexDirection='row' style={styles.header}>
                <TouchableOpacity disabled={isLoading} onPress={()=>{setSelected('Video'); getFavouriteFiles('Video')}}>
                    <Text style={[styles.headerText, selected==='Video' ? {borderBottomColor:'#1976d2', color:'#1976d2'}:{borderBottomColor:'transparent', color:'#fff'}]}>Videos</Text>
                </TouchableOpacity>
            </View>

        </View>

        {selected==='Image' && files!==[] && <ImageDisplayer setRefresh={()=>getFavouriteFiles(selected)} count={count} images={files}/>}
        {selected==='Audio' && <AudioDisplayer setRefresh={()=>getFavouriteFiles(selected)} count={count} audios={files}/>}
        {selected==='Video' && <VideoDisplayer setRefresh={()=>getFavouriteFiles(selected)} count={count} videos={files}/>}

    </ImageBackground>);
}
import React, {useState,useContext} from 'react';
import {ImageBackground} from 'react-native';
import {SearchHeader} from '../commons/Header';
import {styles} from '../styles/commons';
import {searchFiles} from '../api/search';
import {ImageDisplayer} from '../commons/ImageDisplayer';
import {AudioDisplayer} from '../commons/AudioDisplayer';
import {VideoDisplayer} from '../commons/VideoDisplayer';

export const SearchResultScreen = ({route,navigation}) => {
    const [files, setFiles] = useState([]);
    const [count, setCount] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const type=route.params.type;

    React.useEffect(()=>{  
        navigation.addListener('focus', ()=>{ 
            setRefresh(true);
        })
        searchFiles({type:route.params.type, title:route.params.values.title, album:route.params.values.album, artist:route.params.values.artist, year:route.params.values.year, subject:route.params.values.subject})
        .then((response)=>{
            setCount(response.count);
            if (type ==='Image'){setFiles(response.Images);}
            else if (type ==='Audio'){setFiles(response.Audios);}
            else{setFiles(response.Videos);} 
        })
        .catch((error)=>{
            console.log(error)
        })
        setRefresh(false);
        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible:false,
        });
        return()=>
            parent.setOptions({
                tabBarVisible: true
        });
    },[refresh])

    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <SearchHeader navigation={navigation} route={route}/>
            {type==='Image' && <ImageDisplayer setRefresh={setRefresh} images={files} count={count}/>}
            {type==='Audio' && <AudioDisplayer setRefresh={setRefresh} audios={files} count={count}/>}
            {type==='Video' && <VideoDisplayer setRefresh={setRefresh} videos={files} count={count}/>}
        </ImageBackground>
    );
}

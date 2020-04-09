import React from 'react';
import {ImageBackground, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, View} from 'react-native';
import {SearchHeader} from '../commons/Header';
import {styles} from '../styles/commons';
import { AuthContext } from '../navigators/context';
import {searchImages, searchAudios} from '../api/search';

export const SearchResultScreen = ({route,navigation}) => {
    const {authContext,state} = React.useContext(AuthContext); 

    React.useEffect(()=>{  
        navigation.addListener('focus', ()=>{
            searchAudios({token:state.userToken, type:route.params.type, title:route.params.values.title, album:route.params.values.album, artist:route.params.values.artist, year:route.params.values.year})
            .then((response)=>{
                // setCount(response.count);
                // setImages(response.Images); 
                console.log(response)
            })
            .catch((error)=>{
                console.log(error)
            })
        })
    },[navigation])

    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <SearchHeader navigation={navigation} route={route}>Search Results</SearchHeader>
            
        </ImageBackground>
    );
}

import React, { useState } from 'react';
import {ImageBackground, Text, View, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {styles} from '../styles/favouriteScreen';
import {Header} from '../commons/Header';
import { ScrollView } from 'react-native-gesture-handler';

const FavouriteView = ({type})=>{
    const [selected, setSelected] = useState(null);
    const [files, setFiles] = useState([]);

    function getFavouriteFiles(){
        
    }

    return(
        <View>
            <View flexDirection='row' style={styles.header}>
                <Text style={styles.headerText}>Favourite {type}s</Text>
                {selected? (
                    <TouchableOpacity onPress={()=>setSelected(null)}>
                        <AntDesign name='up' style={styles.headerIcon }/>  
                    </TouchableOpacity>
                ):(
                    <TouchableOpacity onPress={()=>setSelected(type)}>
                        <AntDesign name='down' style={styles.headerIcon }/>  
                    </TouchableOpacity>
                )}
            </View>
            {selected && 
            <View>
                <Text>wserdtfyugihojdfcgvbh  {type}</Text>
            </View>}
        </View>
    );
} 
export const FavouritesScreen = ({navigation}) => {

    return(
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
        <Header navigation={navigation}>MyFavourites</Header>
        <ScrollView>
            <FavouriteView type='Image'/>
            <FavouriteView type='Audio'/>
            <FavouriteView type='Video'/>
        </ScrollView>
    </ImageBackground>);
}
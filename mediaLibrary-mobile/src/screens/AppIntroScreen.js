import React, { useState } from 'react';
import {Dimensions, Text, View, StyleSheet, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { AuthContext } from '../navigators/context';

const slides = [
    {
        key:1,
        title: 'Store and Manage',
        text: 'all your media files at on place',
        image: require('../../assets/intro.jpg'),
        backgroundColor: '#fff'
    },
    {
        key:2,
        title: 'Search Media Files',
        text: 'based on title, artist, year, etc.',
        image: require('../../assets/search.png'),
        backgroundColor: '#fff'
    },
    {
        key:3,
        title: 'Share media files',
        text: 'with your friends',
        image: require('../../assets/share.png'),
        backgroundColor: '#fff'
    },
]
export const AppIntroScreen = ({route,navigation}) => {

    const [realApp, showRealApp] = useState(false);
    const {signUp} = React.useContext(AuthContext);

    const renderItem = ({item}) => {
        return(
            <View style={styles.view}>
                <Text style={styles.header}>{item.title}</Text>
                <Text style={styles.text}>{item.text}</Text>
              <Image source={item.image} style={styles.image}/>
            </View>
        )
    }

    if(realApp){
        return(<View></View>)
    } 
    else{
        return(
            <AppIntroSlider 
                data={slides} 
                onDone={()=>signUp({token:route.params.token, email:route.params.email})} 
                renderItem={renderItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex:1,
    },
    text: {
        marginTop:10,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 20
    },
    header: {
        marginTop: 50,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    image:{
        height: Dimensions.get('screen').height/2, 
        width: Dimensions.get('window').width,
    }
});
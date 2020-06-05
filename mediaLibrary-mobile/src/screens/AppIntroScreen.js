import React, { useState } from 'react';
import {Dimensions, Text, View, StyleSheet, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { AuthContext } from '../navigators/context';

const slides = [
    {
        key:'1',
        title: 'Store and Manage',
        text: 'All your media files at on place',
        image: require('../../assets/intro.jpg'),
        backgroundColor: '#fff'
    },
    {
        key:'2',
        title: 'Search Your Media Files',
        text: 'By title, artist, album, year etc.',
        image: require('../../assets/search.png'),
        backgroundColor: '#fff'
    },
    {
        key:'3',
        title: 'Share Your Media Files',
        text: 'With your friends',
        image: require('../../assets/share.png'),
        backgroundColor: '#fff'
    },
]
export const AppIntroScreen = ({route,navigation}) => {

    const [realApp, showRealApp] = useState(false);
    const {signUp} = React.useContext(AuthContext);

    const renderItem = ({item}) => {
        return(
            <View style={styles.view} accessibilityLabel='slide'>
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
                accessibilityLabel='appIntro'
                data={slides} 
                onDone={()=>signUp({token:route.params.token, email:route.params.email})} 
                renderItem={renderItem}
                onSkip={()=>signUp({token:route.params.token, email:route.params.email})}
                showSkipButton={true}
            />
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex:1,
        backgroundColor: 'rgba(51,102,153,1)',
        justifyContent: 'center'
    },
    text: {
        marginTop:10,
        alignSelf: 'center',
        // fontWeight: 'bold',
        fontSize: 17,
        marginBottom: 40,
        color: '#fff',
        opacity: 0.6
    },
    header: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 19,
        color:'#fff'
    },
    image:{
        height: Dimensions.get('screen').height/2, 
        width: Dimensions.get('window').width,
        marginBottom: 40,
    }
});
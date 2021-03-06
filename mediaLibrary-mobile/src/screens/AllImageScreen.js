import React from 'react';
import {ImageBackground, View} from 'react-native';
import {styles} from '../styles/commons';
import {Header} from '../commons/Header';
import {getImages} from '../api/image';
import {ImageDisplayer} from '../commons/ImageDisplayer';

export const AllImageScreen = ({navigation, route}) => {
    const [images, setImages] = React.useState([]);
    const [count, setCount] = React.useState(null);
    const [refresh, setRefresh] = React.useState(false);

    React.useEffect(()=>{  
        navigation.addListener('focus', ()=>{
            setRefresh(true);
        });
        getImages()
        .then((response)=>{
            setCount(response.count);
            setImages(response.Images); 
        })
        .catch((error)=>{
            console.log(error)
        })
        setRefresh(false);
    },[refresh])

    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage} accessibilityLabel='allImageScreen'>
            <Header navigation={navigation}>Image</Header>
            <View flex={1}>
                <ImageDisplayer setRefresh={setRefresh} images={images} count={count}/>
            </View>
        </ImageBackground>       
    )
} 
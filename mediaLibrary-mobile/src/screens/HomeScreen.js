import React, { useState } from 'react';
import {ImageBackground, Text, View, Image, TouchableWithoutFeedback} from 'react-native';
import {styleHome} from '../styles/homeStyle';
import {HomeSearch} from '../modals/HomeSearch';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export const HomeScreen = ({navigation}) => {
    const [visible, setVisible] = useState(false);
    
    return (
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styleHome.backgroundImage}>
            <View flexDirection='row' style={styleHome.header}>
                <FontAwesome.Button name="navicon" underlayColor='transparent' backgroundColor="transparent" color="#fff" size={20} marginLeft={10} marginTop={8} onPress={()=>navigation.toggleDrawer()}/>  
                <Text style={{fontSize: 20, color:'#fff', marginTop:10}}>
                    MyMedia
                </Text>
                <Text style={styleHome.nextHeader}>Home</Text> 
                <FontAwesome.Button name='search' underlayColor='transparent' backgroundColor="transparent" color="#fff" size={20} marginLeft={100} marginTop={6} onPress={()=>setVisible(true)}/>
            </View>

            <ScrollView style={styleHome.container}>
                <View style={styleHome.container}>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate('Images')}>
                        <View style={styleHome.imageContainer}>
                            <Image source={require('../../assets/image.jpg')} style={styleHome.image}/>
                            <View style={styleHome.imageBottom}>
                                <Text style={styleHome.imageText}>Store & Manage Your Images</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate('Audios')}>
                        <View style={styleHome.imageContainer}>
                            <Image source={require('../../assets/audio1.jpg')} style={styleHome.image}/>
                            <View style={styleHome.imageBottom}>
                                <Text style={styleHome.imageText}>Store & Manage Your Audios</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>navigation.navigate('Videos')}>
                        <View style={styleHome.imageContainer}>
                            <Image source={require('../../assets/videos.jpg')} style={styleHome.image}/>
                            <View style={styleHome.imageBottom}>
                                <Text style={styleHome.imageText}>Store & Manage Your Videos</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
            <HomeSearch visible={visible} setVisible={setVisible}/>
        </ImageBackground>
    );
}


import React, { useState } from 'react';
import {ImageBackground, Text, View, Image, TouchableWithoutFeedback} from 'react-native';
import {styleHome} from '../styles/homeStyle';
import {HomeSearch} from '../modals/HomeSearch';
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Badge, Icon, withBadge} from 'react-native-elements';

export const HomeScreen = ({navigation}) => {
    const [visible, setVisible] = useState(false);
    const [badge, setBadge] = useState(4);
    const BadgedIcon = withBadge(badge)(Icon) 
    
    return (
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styleHome.backgroundImage} accessibilityLabel='home'>
            <View flexDirection='row' style={styleHome.header}>
                <FontAwesome.Button name="navicon" underlayColor='transparent' backgroundColor="transparent" color="#fff" size={20} marginLeft={10} marginTop={8} onPress={()=>navigation.toggleDrawer()}/>  
                <Text style={{fontSize: 20, color:'#fff', marginTop:10}}>
                    MyMedia
                </Text>
                <Text style={styleHome.nextHeader}>Home</Text> 
                <FontAwesome.Button accessibilityLabel='search' name='search' underlayColor='transparent' backgroundColor="transparent" color="#fff" size={20} marginLeft={60} marginTop={6} onPress={()=>setVisible(true)}/>
                {/* <MaterialIcons.Button accessibilityLabel='notifications' name='notifications' underlayColor='transparent' backgroundColor="transparent" color="#fff" size={25} marginLeft={-10} marginTop={4} onPress={()=>alert('true')}/> */}
                
                <BadgedIcon type="MaterialIcons" name="notifications" right={-5} top={-5} iconStyle={{color:"#fff"}} onPress={()=>navigation.navigate('Notifications')} underlayColor="transparent"/>
            </View>

            <ScrollView style={styleHome.container}>
                <View style={styleHome.container}>
                    <TouchableWithoutFeedback accessibilityLabel='images' onPress={()=>navigation.navigate('Images')}>
                        <View style={styleHome.imageContainer}>
                            <Image source={require('../../assets/image.jpg')} style={styleHome.image}/>
                            <View style={styleHome.imageBottom}>
                                <Text style={styleHome.imageText}>Store & Manage Your Images</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback accessibilityLabel='audios' onPress={()=>navigation.navigate('Audios')}>
                        <View style={styleHome.imageContainer}>
                            <Image source={require('../../assets/audio1.jpg')} style={styleHome.image}/>
                            <View style={styleHome.imageBottom}>
                                <Text style={styleHome.imageText}>Store & Manage Your Audios</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback accessibilityLabel='videos' onPress={()=>navigation.navigate('Videos')}>
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


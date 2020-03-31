import React from 'react';
import { ImageBackground, View, Text } from 'react-native';
import {HomeScreen} from '../screens/HomeScreen';
import {FavouritesScreen} from '../screens/FavouritesScreen';
import { createDrawerNavigator, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import {AuthContext} from '../screens/context'
import { styles } from '../styles/drawer';
import { FontAwesome } from '@expo/vector-icons';
import { TabNavigator } from './TabNavigator';

const Drawer = createDrawerNavigator();

const VideoTabNavigator = () => (<TabNavigator type='Video'/>);
const ImageTabNavigator = () => (<TabNavigator type='Image'/>);
const AudioTabNavigator = () => (<TabNavigator type='Audio'/>);

export const DrawerNavigator = ()=>{
const {signOut} = React.useContext(AuthContext);

function CustomDrawerContent(props) {
    return (
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.drawerImage}>
            <View>
                <View style={styles.drawerHeader}>
                    <FontAwesome name="user-circle-o" style={styles.drawerIcon}/>
                    <Text style={styles.drawerHeaderText}>nikeshalarathnayake19@gmail.com</Text>
                </View>
                <DrawerItemList {...props} activeTintColor='#1976d2' inactiveTintColor='#fff'/>
                <DrawerItem labelStyle={{color:'#fff'}} label="Logout" onPress={() => signOut()}/>
            </View>       
        </ImageBackground>
    );
}

    return(
		<Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawerContent {...props}/>}>
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="Images" component={ImageTabNavigator}/>
            <Drawer.Screen name="Audios" component={AudioTabNavigator}/>
            <Drawer.Screen name="Videos" component={VideoTabNavigator}/>
            <Drawer.Screen name="Favourites" component={FavouritesScreen}/>
        </Drawer.Navigator>
);	
}		
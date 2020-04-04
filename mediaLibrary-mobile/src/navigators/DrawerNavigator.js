import React from 'react';
import { ImageBackground, View, Text, AsyncStorage } from 'react-native';
import {HomeScreen} from '../screens/HomeScreen';
import {FavouritesScreen} from '../screens/FavouritesScreen';
import { createDrawerNavigator, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import {AuthContext} from './context'
import { styles } from '../styles/drawer';
import { FontAwesome } from '@expo/vector-icons';
import { ImageTabNavigator, AudioTabNavigator, VideoTabNavigator } from './TabNavigator';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = ()=>{
const {authContext, state} = React.useContext(AuthContext);
const [email,setEmail] = React.useState(null);

React.useEffect(()=>{
    const getEmail = async () => {
        try {
            setEmail(await AsyncStorage.getItem('email'));
        } catch (e) {
        }
    }
    getEmail();	
    }, []);


function CustomDrawerContent(props) {
    return (
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.drawerImage}>
            <View>
                <View style={styles.drawerHeader}>
                    <FontAwesome name="user-circle-o" style={styles.drawerIcon}/>
                    <Text style={styles.drawerHeaderText}>{email}</Text>
                </View>
                <DrawerItemList {...props} activeTintColor='#1976d2' inactiveTintColor='#fff'/>
                <DrawerItem labelStyle={{color:'#fff'}} label="Logout" onPress={() => authContext.signOut()}/>
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
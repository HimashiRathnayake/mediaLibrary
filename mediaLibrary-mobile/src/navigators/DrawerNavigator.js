import React from 'react';
import { ImageBackground, View, Text, AsyncStorage } from 'react-native';
import {HomeScreen} from '../screens/HomeScreen';
import {FavouritesScreen} from '../screens/FavouritesScreen';
import { createDrawerNavigator, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import {AuthContext} from './context'
import { styles } from '../styles/drawer';
import { FontAwesome, Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageTabNavigator, AudioTabNavigator, VideoTabNavigator } from './TabNavigator';
import { HomeStackScreen } from './StackNavigators';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = ()=>{
const {signOut} = React.useContext(AuthContext);
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
        <View>
            <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.drawerImage}>
                <View>
                    <View style={styles.drawerHeader}>
                        <FontAwesome name="user-circle-o" style={styles.drawerIcon}/>
                        <Text accessibilityLabel='useremail' style={styles.drawerHeaderText}>{email}</Text>
                    </View>
                    <DrawerItemList {...props} itemStyle={{marginLeft:25}} labelStyle={{marginLeft:-20, fontSize:15}} activeTintColor='#1976d2' inactiveTintColor='#fff'/>
                    <DrawerItem 
                        labelStyle={{color:'#fff', marginLeft: -20, fontSize:15}} 
                        label="Logout" 
                        onPress={() => signOut()}
                        style={{marginLeft:25}}
                        icon ={()=><MaterialCommunityIcons name="logout" color='#fff' size={18}/>}
                    />
                </View>       
            </ImageBackground>
        </View>
    );
}

    return(
		<Drawer.Navigator initialRouteName="Home" drawerStyle={{width:279}} drawerContent={props => <CustomDrawerContent {...props}/>}>
            <Drawer.Screen name="Home" component={HomeStackScreen} options={{drawerIcon: ({color, size}) => 
                <FontAwesome name="home" color={color} size={18}/>
            }}/>
            <Drawer.Screen name="Images" component={ImageTabNavigator} options={{drawerIcon: ({color, size}) => 
                <Entypo name="images" color={color} size={18}/>
            }}/>
            <Drawer.Screen name="Audios" component={AudioTabNavigator} options={{drawerIcon: ({color, size}) => 
                <MaterialIcons name="library-music" color={color} size={18}/>
            }}/>
            <Drawer.Screen name="Videos" component={VideoTabNavigator} options={{drawerIcon: ({color, size}) => 
                <MaterialIcons name="video-library" color={color} size={18}/>
            }}/>
            <Drawer.Screen name="Favourites" component={FavouritesScreen} options={{drawerIcon: ({color, size}) => 
                <MaterialIcons name="favorite" color={color} size={18}/>
            }}/>
        </Drawer.Navigator>
    );	
}		
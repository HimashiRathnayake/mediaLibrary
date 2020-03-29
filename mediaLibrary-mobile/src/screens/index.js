import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import {Box, Text} from 'react-native-design-utility';
import HomeScreen from './HomeScreen';
import ImageScreen from './ImageScreen';
import AudioScreen from './AudioScreen';
import VideoScreen from './VideoScreen';
import LogoutScreen from './LogoutScreen';

// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Help" onPress={() => alert('Link to help')} />
      </DrawerContentScrollView>
    );
  }

export default class Navigator extends Component {
    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="Image" component={ImageScreen} />
                    <Drawer.Screen name="Audio" component={AudioScreen} />
                    <Drawer.Screen name="Video" component={VideoScreen} />
                    <Drawer.Screen name="Logout" component={LogoutScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
            // <NavigationContainer>
            //     <Stack.Navigator>
            //         <Stack.Screen name="MediaLibrary" component={HomeScreen} options={{headerLeft: () => (<NavButton/>)}}/>
            //     </Stack.Navigator>
            // </NavigationContainer>    
        );
    }
}
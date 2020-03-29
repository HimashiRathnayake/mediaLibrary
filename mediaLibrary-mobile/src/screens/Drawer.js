import React, {Component} from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import {Box, Text} from 'react-native-design-utility';
import HomeScreen from './HomeScreen';
import ImageScreen from './ImageScreen';
import AudioScreen from './AudioScreen';
import VideoScreen from './VideoScreen';
import LogoutScreen from './LogoutScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <Box ml='xs' mr='xs' h={150} bg="blueDarkest">
                <Box mr='sm' radius='xs' bg='white'></Box>
                <Text color='white' size={14}>nikeshalarathnayake@gmail.com</Text>
            </Box>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
  }

  export default class Navigator extends Component {
    render() {
        return (
            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Image" component={ImageScreen} />
                <Drawer.Screen name="Audio" component={AudioScreen} />
                <Drawer.Screen name="Video" component={VideoScreen} />
                <Drawer.Screen name="Logout" component={LogoutScreen} />
            </Drawer.Navigator>
        );
    }
}
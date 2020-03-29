import React, {Component} from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
  
export default class NavButton extends Component {
    render() {
        return (
            <FontAwesome.Button name="navicon" backgroundColor="white" color="#1976d2" size={30} onPress={()=>Navigation.openDrawer()}/>    
        );
    }
}

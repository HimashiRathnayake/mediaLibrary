import React, { Component, useState } from 'react';
import {HomeScreen} from '../screens/HomeScreen';
import {ImageScreen} from '../screens/ImageScreen';
import {VideoScreen} from '../screens/VideoScreen';
import {AudioScreen} from '../screens/AudioScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {ShareScreen} from '../screens/ShareScreen';
import {FavouritesScreen} from '../screens/FavouritesScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LogoutScreen } from '../screens/LogoutScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Tabs =createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const VideoTabNavigator = () => (
	<Tabs.Navigator initialRouteName='Video'>
			<Tabs.Screen name="Video" component={VideoScreen}/>
            <Tabs.Screen name="Search" component={SearchScreen}/>
            <Tabs.Screen name="Share" component={ShareScreen}/>
	</Tabs.Navigator>
);

const ImageTabNavigator = () => (
	<Tabs.Navigator initialRouteName='Image'>
			<Tabs.Screen name="Image" component={ImageScreen}/>
            <Tabs.Screen name="Search" component={SearchScreen}/>
            <Tabs.Screen name="Share" component={ShareScreen}/>
	</Tabs.Navigator>
);

const AudioTabNavigator = () => (
	<Tabs.Navigator initialRouteName='Audio'>
			<Tabs.Screen name="Audio" component={AudioScreen}/>
            <Tabs.Screen name="Search" component={SearchScreen}/>
            <Tabs.Screen name="Share" component={ShareScreen}/>
	</Tabs.Navigator>
);

export const DrawerNavigator = ()=>(
		<Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="Image" component={ImageTabNavigator}/>
            <Drawer.Screen name="Audio" component={AudioTabNavigator}/>
            <Drawer.Screen name="Video" component={VideoTabNavigator}/>
            <Drawer.Screen name="Favourites" component={FavouritesScreen}/>
            <Drawer.Screen name="Logout" component={LogoutScreen}/>
        </Drawer.Navigator>
);			
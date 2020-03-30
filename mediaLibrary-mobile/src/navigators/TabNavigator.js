import React from 'react';
import {ImageScreen} from '../screens/ImageScreen';
import {VideoScreen} from '../screens/VideoScreen';
import {AudioScreen} from '../screens/AudioScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {ShareScreen} from '../screens/ShareScreen';
import {FolderScreen} from '../screens/FolderScreen';
import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs =createBottomTabNavigator();

export const TabNavigator = ({type}) => (
    <Tabs.Navigator initialRouteName={type} tabBarOptions={{tabStyle:{paddingTop: 20}, style:{backgroundColor:'transparent', borderTopWidth:0, left:0, right:0, bottom:0, height: 70,position:'absolute'}}}>
			{type==='Video' && <Tabs.Screen name="Video" component={VideoScreen} options={{tabBarLabel: 'All', tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="video-library" color={color} size={size} />)}}/>}
            {type==='Image' && <Tabs.Screen name="Image" component={ImageScreen} options={{tabBarLabel: 'All', tabBarIcon: ({ color, size }) => (
                <Entypo name="images" color={color} size={size} />)}}/>}
            {type==='Audio' && <Tabs.Screen name="Audio" component={AudioScreen} options={{tabBarLabel: 'All', tabBarIcon: ({ color, size }) => (
                <Entypo name="beamed-note" color={color} size={size} />)}}/>}

            <Tabs.Screen name="Folders" component={FolderScreen} initialParams={{type:type}} options={{tabBarLabel: 'Folders', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="folder-open" color={color} size={size} />)}}/>
            <Tabs.Screen name="Search" component={SearchScreen} initialParams={{type:type}} options={{tabBarLabel: 'Search', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="search" color={color} size={size} />)}}/>
            <Tabs.Screen name="Share" component={ShareScreen} initialParams={{type:type}} options={{tabBarLabel: 'Share', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="slideshare" color={color} size={size} />)}}/>
	</Tabs.Navigator>
);


import React from 'react';
import {AllImageScreen} from '../screens/AllImageScreen';
import {AllVideoScreen} from '../screens/AllVideoScreen';
import {AllAudioScreen} from '../screens/AllAudioScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {ShareScreen} from '../screens/ShareScreen';
import {FolderStackScreen} from '../navigators/StackNavigators';
import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs =createBottomTabNavigator();

export const ImageTabNavigator = () => {
    return(
        <Tabs.Navigator initialRouteName='Image' tabBarOptions={{tabStyle:{paddingTop: 20}, style:{backgroundColor:'transparent', 
                borderTopWidth:0, left:0, right:0, bottom:0, height: 70,position:'absolute'}}}>
            <Tabs.Screen name="Image" component={AllImageScreen} options={{tabBarLabel: 'All', tabBarIcon: ({ color, size }) => (
                <Entypo name="images" color={color} size={size} />)}}/>
            <Tabs.Screen name="Folders" component={FolderStackScreen} initialParams={{type:'Image'}} options={{tabBarLabel: 'Folders', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="folder-open" color={color} size={size} />)}}/>
            <Tabs.Screen name="Search" component={SearchScreen} initialParams={{type:'Image'}} options={{tabBarLabel: 'Search', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="search" color={color} size={size} />)}}/>
            <Tabs.Screen name="Share" component={ShareScreen} initialParams={{type:'Image'}} options={{tabBarLabel: 'Share', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="slideshare" color={color} size={size} />)}}/>
        </Tabs.Navigator>
    );
}

export const AudioTabNavigator = () => {
    return(
        <Tabs.Navigator initialRouteName='Audio' tabBarOptions={{tabStyle:{paddingTop: 20}, style:{backgroundColor:'transparent', 
                borderTopWidth:0, left:0, right:0, bottom:0, height: 70,position:'absolute'}}}>
            <Tabs.Screen name="Audio" component={AllAudioScreen} options={{tabBarLabel: 'All', tabBarIcon: ({ color, size }) => (
                <Entypo name="beamed-note" color={color} size={size} />)}}/>
            <Tabs.Screen name="Folders" component={FolderStackScreen} initialParams={{type:'Audio'}} options={{tabBarLabel: 'Folders', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="folder-open" color={color} size={size} />)}}/>
            <Tabs.Screen name="Search" component={SearchScreen} initialParams={{type:'Audio'}} options={{tabBarLabel: 'Search', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="search" color={color} size={size} />)}}/>
            <Tabs.Screen name="Share" component={ShareScreen} initialParams={{type:'Audio'}} options={{tabBarLabel: 'Share', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="slideshare" color={color} size={size} />)}}/>
        </Tabs.Navigator>
    );
}

export const VideoTabNavigator = (route) => {
    return(
        <Tabs.Navigator initialRouteName='Video' tabBarOptions={{tabStyle:{paddingTop: 20}, style:{backgroundColor:'transparent', 
                borderTopWidth:0, left:0, right:0, bottom:0, height: 70,position:'absolute'}}}>
            <Tabs.Screen name="Video" component={AllVideoScreen} options={{tabBarLabel: 'All', tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="video-library" color={color} size={size} />)}}/>
            <Tabs.Screen name="Folders" component={FolderStackScreen} initialParams={{type:'Video'}} options={{tabBarLabel: 'Folders', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="folder-open" color={color} size={size} />)}}/>
            <Tabs.Screen name="Search" component={SearchScreen} initialParams={{type:'Video'}} options={{tabBarLabel: 'Search', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="search" color={color} size={size} />)}}/>
            <Tabs.Screen name="Share" component={ShareScreen} initialParams={{type:'Video'}} options={{tabBarLabel: 'Share', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="slideshare" color={color} size={size} />)}}/>
        </Tabs.Navigator>
    );
} 

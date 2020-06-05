import React from 'react';
import {AllImageScreen} from '../screens/AllImageScreen';
import {AllVideoScreen} from '../screens/AllVideoScreen';
import {AllAudioScreen} from '../screens/AllAudioScreen';
import {ShareScreen} from '../screens/ShareScreen';
import {FolderStackScreen, SearchStackScreen} from '../navigators/StackNavigators';
import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs =createBottomTabNavigator();

export const ImageTabNavigator = () => {
    return(
        <Tabs.Navigator initialRouteName='Image' tabBarOptions={{keyboardHidesTabBar:true, tabStyle:{paddingTop: 20}, style:{backgroundColor:'transparent', 
                borderTopWidth:0, left:0, right:0, bottom:0, height: 70,position:'absolute'}}}>
            <Tabs.Screen name="Image" component={AllImageScreen} options={{tabBarAccessibilityLabel:'imageTab', tabBarLabel: 'All', tabBarIcon: ({ color, size }) => (
                <Entypo name="images" color={color} size={size} />)}}/>
            <Tabs.Screen name="Folders" component={FolderStackScreen} initialParams={{type:'Image'}} options={{tabBarAccessibilityLabel:'folderTab1', tabBarLabel: 'Folders', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="folder-open" color={color} size={size} />)}}/>
            <Tabs.Screen name="Share" component={ShareScreen} initialParams={{type:'Image'}} options={{tabBarAccessibilityLabel:'shareTab1', tabBarLabel: 'Shared', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="slideshare" color={color} size={size} />)}}/>
            <Tabs.Screen name="Search" component={SearchStackScreen} initialParams={{type:'Image'}} options={{tabBarAccessibilityLabel:'searchTab1', tabBarLabel: 'Search', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="search" color={color} size={size} />)}}/>
        </Tabs.Navigator>
    );
}

export const AudioTabNavigator = () => {
    return(
        <Tabs.Navigator initialRouteName='Audio' tabBarOptions={{keyboardHidesTabBar:true, tabStyle:{paddingTop: 20}, style:{backgroundColor:'transparent', 
                borderTopWidth:0, left:0, right:0, bottom:0, height: 70,position:'absolute'}}}>
            <Tabs.Screen name="Audio" component={AllAudioScreen} options={{tabBarAccessibilityLabel:'audioTab', tabBarLabel: 'All', tabBarIcon: ({ color, size }) => (
                <Entypo name="beamed-note" color={color} size={size} />)}}/>
            <Tabs.Screen name="Folders" component={FolderStackScreen} initialParams={{type:'Audio'}} options={{tabBarAccessibilityLabel:'folderTab2', tabBarLabel: 'Folders', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="folder-open" color={color} size={size} />)}}/>
            <Tabs.Screen name="Share" component={ShareScreen} initialParams={{type:'Audio'}} options={{tabBarAccessibilityLabel:'shareTab2', tabBarLabel: 'Shared', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="slideshare" color={color} size={size} />)}}/>
            <Tabs.Screen name="Search" component={SearchStackScreen} initialParams={{type:'Audio'}} options={{tabBarAccessibilityLabel:'searchTab2', tabBarLabel: 'Search', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="search" color={color} size={size} />)}}/>
        </Tabs.Navigator>
    );
}

export const VideoTabNavigator = (route) => {
    return(
        <Tabs.Navigator initialRouteName='Video' tabBarOptions={{keyboardHidesTabBar:true, tabStyle:{paddingTop: 20}, style:{backgroundColor:'transparent', 
                borderTopWidth:0, left:0, right:0, bottom:0, height: 70,position:'absolute'}}}>
            <Tabs.Screen name="Video" component={AllVideoScreen} options={{tabBarAccessibilityLabel:'videotab', tabBarLabel: 'All', tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="video-library" color={color} size={size} />)}}/>
            <Tabs.Screen name="Folders" component={FolderStackScreen} initialParams={{type:'Video'}} options={{tabBarAccessibilityLabel:'foldertab', tabBarLabel: 'Folders', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="folder-open" color={color} size={size} />)}}/>
            <Tabs.Screen name="Share" component={ShareScreen} initialParams={{type:'Video'}} options={{tabBarAccessibilityLabel:'shareTab', tabBarLabel: 'Shared', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="slideshare" color={color} size={size} />)}}/>
            <Tabs.Screen name="Search" component={SearchStackScreen} initialParams={{type:'Video'}} options={{tabBarAccessibilityLabel:'searchTab', tabBarLabel: 'Search', tabBarIcon: ({ color, size }) => (
                <FontAwesome name="search" color={color} size={size} />)}}/>
        </Tabs.Navigator>
    );
} 

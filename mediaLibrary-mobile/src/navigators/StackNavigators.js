import React from 'react';
import {FolderScreen} from '../screens/FolderScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageScreen } from '../screens/ImageScreen';
import { AudioScreen } from '../screens/AudioScreen';
import { VideoScreen } from '../screens/VideoScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { SearchResultScreen } from '../screens/SearchResultScreen';

const FolderStack = createStackNavigator();

export const FolderStackScreen = ({route, navigation})=>{
    const type= route.params.type;
    return(
        <FolderStack.Navigator initialRouteName='Folder'>
            <FolderStack.Screen name="Folder" initialParams={{type:type}} component={FolderScreen} options={{headerShown: false}}/>
            <FolderStack.Screen name="Image" component={ImageScreen} options={{headerShown: false}}/>
            <FolderStack.Screen name="Audio" component={AudioScreen} options={{headerShown: false}}/>
            <FolderStack.Screen name="Video" component={VideoScreen} options={{headerShown: false}}/>
        </FolderStack.Navigator>
    );
}

export const SearchStackScreen = ({route, navigation})=>{
    const type= route.params.type;
    return(
        <FolderStack.Navigator initialRouteName='Search'>
            <FolderStack.Screen name="Search" initialParams={{type:type}} component={SearchScreen} options={{headerShown: false}}/>
            <FolderStack.Screen name="Result" initialParams={{type:type}} component={SearchResultScreen} options={{headerShown: false}}/>
        </FolderStack.Navigator>
    );
}
import React from 'react';
import {ImageScreen} from '../screens/ImageScreen';
import {VideoScreen} from '../screens/VideoScreen';
import {AudioScreen} from '../screens/AudioScreen';
import {SearchScreen} from '../screens/SearchScreen';
import {ShareScreen} from '../screens/ShareScreen';
import {FolderScreen} from '../screens/FolderScreen';
import { createStackNavigator } from '@react-navigation/stack';

const FolderStack = createStackNavigator();

export const FolderStackScreen = ({route})=>{
    const type= route.params.type;
    return(
        <FolderStack.Navigator initialRouteName='Folder'>
            <FolderStack.Screen name="Folder" initialParams={{type:type}} component={FolderScreen} options={{headerShown: false}}/>
            <FolderStack.Screen name="FolderImages" component={ImageScreen} options={{headerShown: false}}/>
        </FolderStack.Navigator>
    );
}

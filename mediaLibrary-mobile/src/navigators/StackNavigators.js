import React from 'react';
import {FolderScreen} from '../screens/FolderScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { FilesScreen } from '../screens/FilesScreen';

const FolderStack = createStackNavigator();

export const FolderStackScreen = ({route, navigation})=>{
    const type= route.params.type;
    return(
        <FolderStack.Navigator initialRouteName='Folder'>
            <FolderStack.Screen name="Folder" initialParams={{type:type}} component={FolderScreen} options={{headerShown: false}}/>
            <FolderStack.Screen name="InsideFolder" component={FilesScreen} options={{headerShown: false}}/>
        </FolderStack.Navigator>
    );
}

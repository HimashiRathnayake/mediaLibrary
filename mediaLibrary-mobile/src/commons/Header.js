import React from 'react';
import { View, Text } from 'react-native';
import {styles} from '../styles/commons/header';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export const Header = ({children,navigation}) => (
    <View flexDirection='row'>
        <FontAwesome.Button name="navicon" underlayColor='transparent' backgroundColor="transparent" color="#1976d2" size={30} marginTop={20} onPress={()=>navigation.toggleDrawer()}/>  
        <Text style={styles.header}>MyMedia</Text>
        <Text style={styles.nextHeader}>{children}</Text>  
    </View>
);

export const FileHeader = ({navigation, route}) => {
    return(
        <View flexDirection='row'>
            <View flexDirection='row'>
                <Ionicons.Button name="md-arrow-back" underlayColor='transparent' backgroundColor="transparent" color="#1976d2" size={30} marginTop={20} onPress={()=>{
                    navigation.goBack();
                    navigation.dangerouslyGetParent().setOptions({tabBarVisible:true})}}/>  
                <Text style={styles.header}>MyMedia</Text>
                <Text style={styles.nextHeader}>{route.params.folderName}</Text>  
            </View>                
        </View>
    );
}

export const SearchHeader = ({navigation, route}) => {
    return(
        <View flexDirection='row'>
            <View flexDirection='row'>
                <Ionicons.Button name="md-arrow-back" underlayColor='transparent' backgroundColor="transparent" color="#1976d2" size={30} marginTop={20} onPress={()=>{
                    navigation.goBack();
                    navigation.dangerouslyGetParent().setOptions({tabBarVisible:true})}}/>  
                <Text style={styles.header}>Search Results of</Text>
                <Text style={styles.nextHeader}>{route.params.searchText}</Text>  
            </View>                
        </View>
    );
}
import React, { useState } from 'react';
import { View, Text, Dimensions, Picker } from 'react-native';
import {styles} from '../styles/commons/header';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { Formik } from 'formik';

export const Header = ({children,navigation}) => (
    <View flexDirection='row' accessibilityLabel='header'>
        <FontAwesome.Button name="navicon" underlayColor='transparent' backgroundColor="transparent" color="#1976d2" size={25} marginTop={24} marginLeft={12} onPress={()=>navigation.toggleDrawer()}/>  
        <Text style={styles.header}>MyMedia</Text>
        <Text accessibilityLabel='headerText' style={styles.nextHeader}>{children}</Text>  
    </View>
);

export const HomeHeader = ({navigation, setVisible}) => (
    <View flexDirection='row' style={styles.searchHeader} accessibilityLabel='searchHeader'>
        <FontAwesome.Button name="navicon" underlayColor='transparent' backgroundColor="transparent" color="#fff" size={30} marginTop={3} marginLeft={10} onPress={()=>navigation.toggleDrawer()}/>  
        <TextInput 
            accessibilityLabel='searchInput'
            flexDirection='row' 
            placeholder='Search'
            style={{fontSize: 18, width: Dimensions.get('screen').width-100}}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            onTouchStart={()=>setVisible(true)}
        />
    </View>
);

export const FileHeader = ({navigation, route}) => {
    return(
        <View flexDirection='row'>
            <View flexDirection='row' accessibilityLabel='fileHeader'>
                <Ionicons.Button name="md-arrow-back" underlayColor='transparent' backgroundColor="transparent" color="#1976d2" size={30} marginTop={20} onPress={()=>{
                    navigation.goBack();
                    navigation.dangerouslyGetParent().setOptions({tabBarVisible:true})}}/>  
                <Text style={styles.header}>MyMedia</Text>
                <Text accessibilityLabel='folderNameHeader' style={styles.nextHeader}>{route.params.folderName}</Text>  
            </View>                
        </View>
    );
}

export const SearchHeader = ({navigation, route}) => {
    return(
        <View flexDirection='row'>
            <View flexDirection='row' accessibilityLabel='searchHeader'>
                <Ionicons.Button name="md-arrow-back" underlayColor='transparent' backgroundColor="transparent" color="#1976d2" size={30} marginTop={20} onPress={()=>{
                    navigation.goBack();
                    navigation.dangerouslyGetParent().setOptions({tabBarVisible:true})}}/>  
                <Text style={styles.header}>Search Results</Text>
                <Text style={styles.nextHeader} accessibilityLabel='searchText1'>{route.params.searchText}</Text>  
            </View>                
        </View>
    );
}
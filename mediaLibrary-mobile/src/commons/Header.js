import React from 'react';
import { TextInput, View, Text } from 'react-native';
import {styles} from '../styles/commons/header';
import { FontAwesome } from '@expo/vector-icons';

export const Header = ({children,navigation}) => (
    <View flex={1} flexDirection='row'>
        <FontAwesome.Button name="navicon" backgroundColor="transparent" color="#1976d2" size={30} marginTop={20} onPress={()=>navigation.toggleDrawer()}/>  
        <Text style={styles.header}>MyMedia</Text>
        <Text style={styles.nextHeader}>{children}</Text>  
    </View>
);


import React from 'react';
import { TextInput, View } from 'react-native';
import {styles} from './styles/forminput';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

const secure = type => {
    switch (type){
        case 'email':
            return false;
        case 'password':
            return true;
        default: 
            return false;
    }
}
export const FormInput = ({children, type}) => (
    <View style={styles.inputContainer}> 
        {type === 'email' && <FontAwesome name="user-circle-o" style={styles.inputIcon}/>}    
        {type === 'password' && <AntDesign name="lock" style={styles.inputIcon}/>}
        <TextInput 
            style={styles.input}
            placeholder={children}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            secureTextEntry={secure(type)}
        />
    </View>
);

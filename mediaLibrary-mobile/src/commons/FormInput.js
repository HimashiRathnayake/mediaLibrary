import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
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

export const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width:300,
        height: 50,
        marginHorizontal: 30,
        paddingLeft: 60,
        borderRadius: 20,
        color: '#ffffff',
		marginBottom: 20,
	  },
	  inputIcon: {
		position: 'absolute',
		zIndex: 99,
		left: 40,
		top: 9,
		color: 'white',
		fontSize: 30,
	  },
	  inputContainer :{
		// flex:1,
	  }
});

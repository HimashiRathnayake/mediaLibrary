import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import {FormInput} from '../commons/FormInput';
import { Entypo } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {AuthContext} from './context';

export const LoginScreen = ({navigation}) => {
const {signIn} = React.useContext(AuthContext);
return(
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
              <View style={styles.headerContainer}>
                <Entypo name="folder-video" color="white" size={40} /> 
                <Text style={styles.headerText}>Login Here To Continue</Text>
            </View>
            <KeyboardAwareScrollView>
                <View style={styles.form}>
                    <FormInput type='email'>Email</FormInput>
                    <FormInput type='password'>Password</FormInput>
                </View>
            </KeyboardAwareScrollView>
            <View style={styles.bottom}>
                <Text style={styles.bottomtext} onPress={()=>navigation.navigate('SignUp')}>Create Account</Text>
                <Text style={styles.bottomtext}>Forgot Password?</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginbutton} onPress={()=>signIn()}>
                    <Text style={styles.logintext}>LOGIN</Text>
                </TouchableOpacity>
            </View>
    </ImageBackground>
);
}

export const styles = StyleSheet.create({
    backgroundImage:{
        width:360,
        height:640,
        resizeMode:'contain'
    },
    form: {
        alignContent: 'center',
        justifyContent: 'center',
        flex: 1
    },
    btn: {
      position: 'absolute',
      top: 55,
      right: 28,
    },
    bottom: {
      flex: 1,
      top: 65,
      width:360,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    bottomtext: {
      color: 'white',
      backgroundColor: 'transparent',
    },
    loginbutton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1976d2',
      height: 50,
      borderRadius: 20,
      zIndex: 100,
      width: 200
    },
    buttonContainer: {
      flex: 1,
      top: -95,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    logintext: {
      color: 'white',
      backgroundColor: 'transparent',
    },
    headerContainer: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: 'transparent',
      marginTop: 20,
      fontSize: 26
    },
});

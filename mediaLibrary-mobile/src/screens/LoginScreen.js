import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, Button} from 'react-native';
import {styles} from '../styles/loginscreen';
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

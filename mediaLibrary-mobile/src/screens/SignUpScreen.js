import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles/loginscreen';
import {FormInput} from '../commons/FormInput';
import { Entypo } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AuthContext } from './context'

export const SignUpScreen = ({navigation}) => {
const {signUp} = React.useContext(AuthContext);

return(
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
              <View style={styles.headerContainer}>
                <Entypo name="folder-video" color="white" size={40} /> 
                <Text style={styles.headerText}>SignIn Here To Continue</Text>
            </View>
            <KeyboardAwareScrollView>
                <View style={styles.form}>
                    <FormInput type='email'>Email</FormInput>
                    <FormInput type='password'>Password</FormInput>
                    <FormInput type='password'>Confirm Password</FormInput>
                    <TouchableOpacity
                        // activeOpacity={0.7}
                        style={styles.btn}
                        onPress={()=>alert('tyugi')}>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
            <View style={styles.bottom}>
                <Text style={styles.bottomtext} onPress={()=>navigation.navigate('Login')}>Already have an account?</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginbutton} onPress={()=>signUp()}>
                    <Text style={styles.logintext}>SIGNUP</Text>
                </TouchableOpacity>
            </View>
    </ImageBackground>
);
}
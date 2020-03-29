import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../styles/loginscreen';
import {FormInput} from '../commons/FormInput';
import { Entypo } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const LoginScreen = ({navigation}) => (
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
              <View style={styles.headerContainer}>
                <Entypo name="folder-video" color="white" size={40} /> 
                <Text style={styles.headerText}>Login Here To Continue</Text>
            </View>
            <KeyboardAwareScrollView>
                <View style={styles.form}>
                    <FormInput type='email'>Email</FormInput>
                    <FormInput type='password'>Password</FormInput>
                    <TouchableOpacity
                        // activeOpacity={0.7}
                        style={styles.btn}
                        onPress={()=>alert('tyugi')}>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
            <View style={styles.bottom}>
                <Text style={styles.bottomtext} onPress={()=>alert('sdxcfvgh')}>Create Account</Text>
                <Text style={styles.bottomtext}>Forgot Password?</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.loginbutton}>
                    <Text style={styles.logintext}>LOGIN</Text>
                </TouchableOpacity>
            </View>
    </ImageBackground>
);

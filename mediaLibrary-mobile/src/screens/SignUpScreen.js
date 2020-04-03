import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {styles} from '../styles/loginscreen';
import { Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AuthContext } from './context'
import {Formik} from 'formik'
import * as yup from 'yup';

const validationSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(5),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')],"Password doesn't match")
});

export const SignUpScreen = ({navigation}) => {
const {signUp} = React.useContext(AuthContext);

return(
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <View style={styles.headerContainer}>
                <Entypo name="folder-video" color="white" size={40} /> 
                <Text style={styles.headerText}>SignUp Here To Continue</Text>
            </View>
            <KeyboardAwareScrollView>
                    <Formik 
                        initialValues={{email:'',password:'', confirmPassword:''}}
                        validationSchema={validationSchema} 
                        onSubmit={
                            (values, actions)=>{
                                actions.resetForm();
                                signUp();
                        }}
                    >
                    {(props)=>(
                        <View style={styles.form}>
                            <View style={styles.inputContainer}> 
                                <FontAwesome name="user-circle-o" style={styles.inputIcon}/>   
                                <TextInput 
                                    style={styles.input}
                                    placeholder='Email'
                                    placeholderTextColor="white"
                                    underlineColorAndroid="transparent"
                                    secureTextEntry={false}
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.title}
                                />
                            </View>  
                            <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>
                            <View style={styles.inputContainer}> 
                                <AntDesign name="lock" style={styles.inputIcon}/>  
                                <TextInput 
                                    style={styles.input}
                                    placeholder='Password'
                                    placeholderTextColor="white"
                                    underlineColorAndroid="transparent"
                                    secureTextEntry={true}
                                    onChangeText={props.handleChange('password')}
                                    value={props.values.password}
                                />
                            </View>   
                            <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>
                            <View style={styles.inputContainer}> 
                                <AntDesign name="lock" style={styles.inputIcon}/>  
                                <TextInput 
                                    style={styles.input}
                                    placeholder='Confirm Password'
                                    placeholderTextColor="white"
                                    underlineColorAndroid="transparent"
                                    secureTextEntry={true}
                                    onChangeText={props.handleChange('confirmPassword')}
                                    value={props.values.confirmPassword}
                                />
                            </View>   
                            <Text style={styles.errorText}>{props.touched.confirmPassword && props.errors.confirmPassword}</Text>
                            <TouchableOpacity style={styles.loginbutton} onPress={()=>{props.handleSubmit();}}>
                                <Text style={styles.logintext}>SIGNUP</Text>
                            </TouchableOpacity>
                        </View>
                    )}    
                    </Formik>
            </KeyboardAwareScrollView>
            <View style={styles.bottom}>
                <Text style={styles.bottomtext} onPress={()=>navigation.navigate('Login')}>Already have an account?</Text>
            </View>
    </ImageBackground>
);
}
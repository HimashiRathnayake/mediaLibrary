import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Keyboard} from 'react-native';
import {styles} from '../styles/loginscreen';
import { Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../navigators/context';
import {Formik} from 'formik'
import * as yup from 'yup';
import {signup} from "../api/user";

const validationSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(5),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')],"Password doesn't match")
});

export const SignUpScreen = ({navigation}) => {

    const {signUp} = React.useContext(AuthContext);
    const [isLoading, setIsLoading] = React.useState(false);

    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage} accessibilityLabel='signupscreen'>
            <View flex={1} style={{opacity: isLoading ? 0.3 : 1.0}} accessibilityLabel='view'>
                    <Formik 
                        accessibilityLabel='form'
                        initialValues={{email:'',password:'', confirmPassword:''}}
                        validationSchema={validationSchema} 
                        onSubmit={
                            (values, actions)=>{
                                setIsLoading(true);
                                signup({values}).then((response)=>{
                                    if (response.message==='email already exists'){
                                        Alert.alert('Alert','Email already exists. Try with different email',[{text: 'OK', onPress: ()=>actions.resetForm()}]);
                                        setIsLoading(false);
                                    }else if (response.message==='User created'){
                                        // console.log(response.token, values.email)
                                        navigation.navigate('AppIntro', {
                                            token:response.token, 
                                            email:values.email
                                        });
                                        // signUp({token:response.token, email:values.email});
                                    }
                                    else{
                                        alert('Something went wrong. Try again');
                                        setIsLoading(false);
                                    }
                                })
                                .catch((error)=>{console.log(error)});;
                        }}
                    >
                    {(props)=>(
                        <KeyboardAvoidingView flex={3} behavior='padding'>
                        <View style={styles.form}>

                            <View style={styles.headerContainer}>
                                <Entypo name="folder-video" color="white" size={40} /> 
                                <Text style={styles.headerText}>SignUp Here To Continue</Text>
                            </View>

                            <View style={styles.inputContainer}> 
                                <FontAwesome name="user-circle-o" style={styles.inputIcon}/>   
                                <TextInput 
                                    accessibilityLabel='email1'
                                    style={styles.input}
                                    placeholder='Email'
                                    placeholderTextColor="white"
                                    underlineColorAndroid="transparent"
                                    secureTextEntry={false}
                                    keyboardType='email-address'
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                    onSubmitEditing={()=>props.handleSubmit()}
                                />
                            </View>  
                            <Text accessibilityLabel='emailErr1' style={styles.errorText}>{props.touched.email && props.errors.email}</Text>
                            <View style={styles.inputContainer}> 
                                <AntDesign name="lock" style={styles.inputIcon}/>  
                                <TextInput 
                                    accessibilityLabel='password1'
                                    style={styles.input}
                                    placeholder='Password'
                                    placeholderTextColor="white"
                                    underlineColorAndroid="transparent"
                                    secureTextEntry={true}
                                    keyboardType='default'
                                    onChangeText={props.handleChange('password')}
                                    value={props.values.password}
                                    onSubmitEditing={()=>props.handleSubmit()}
                                />
                            </View>   
                            <Text style={styles.errorText} accessibilityLabel='passwordErr1'>{props.touched.password && props.errors.password}</Text>
                            <View style={styles.inputContainer}> 
                                <AntDesign name="lock" style={styles.inputIcon}/>  
                                <TextInput 
                                    accessibilityLabel='confirmP1'
                                    style={styles.input}
                                    placeholder='Confirm Password'
                                    placeholderTextColor="white"
                                    underlineColorAndroid="transparent"
                                    secureTextEntry={true}
                                    keyboardType='default'
                                    onChangeText={props.handleChange('confirmPassword')}
                                    value={props.values.confirmPassword}
                                    onSubmitEditing={()=>props.handleSubmit()}
                                />
                            </View>   
                            <Text accessibilityLabel='confirmPErr1' style={styles.errorText}>{props.touched.confirmPassword && props.errors.confirmPassword}</Text>
                            <TouchableOpacity accessibilityLabel='submit1' style={styles.loginbutton} disabled={isLoading} onPress={()=>{props.handleSubmit();}}>
                                <Text style={styles.logintext}>SIGNUP</Text>
                            </TouchableOpacity>
                        </View>
                        </KeyboardAvoidingView>
                    )}    
                    </Formik>
            
                <View style={styles.bottom}>
                    <Text accessibilityLabel='loginbutton' style={styles.bottomtext} disabled={isLoading} onPress={()=>navigation.navigate('Login')}>Already have an account? Login</Text>
                </View>
            </View>
        </ImageBackground>
    ); 
}
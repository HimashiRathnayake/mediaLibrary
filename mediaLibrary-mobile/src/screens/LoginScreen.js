import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Image} from 'react-native';
import { Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {styles} from '../styles/loginscreen';
import {Formik} from 'formik';
import * as yup from 'yup';
import {login} from "../api/user";
import {AuthContext} from '../navigators/context';

const validationSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
});

export const LoginScreen = ({navigation}) => {

    const [isLoading, setIsLoading] = React.useState(false);
    const {signIn} = React.useContext(AuthContext); 

    return(
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage} accessibilityLabel='loginscreen'>
        <View flex={1} style={{opacity: isLoading ? 0.3 : 1.0}} accessibilityLabel='view1'>
                       
                <Formik 
                    initialValues={{email:'',password:''}}
                    validationSchema={validationSchema} 
                    onSubmit={
                        (values, actions)=>{
                            setIsLoading(true);
                            login({values})
                            .then((response)=>{
                                if (response.message==='Auth successful'){
                                    signIn({token:response.token, email:values.email});
                                }else if (response.message==="Auth failed"){
                                    Alert.alert('Alert',"Email or password is incorrect",[{text: 'OK', onPress: ()=>actions.resetForm()}])
                                    setIsLoading(false);
                                }
                                else{
                                    Alert.alert('Alert',"Something went wrong",[{text: 'OK', onPress: ()=>actions.resetForm()}])
                                    setIsLoading(false);
                                }
                            })
                            .catch((error)=>{console.log(error)});
                    }}
                >
                {(props)=>(
                    <KeyboardAvoidingView flex={3} behavior='padding'>
                    <View style={styles.form}>

                        <View style={styles.headerContainer}>
                            <Image source={require('../../assets/logo.png')} style={styles.originalImage}/>    
                            <Text style={styles.headerText} accessibilityLabel='text1'>Login Here To Continue</Text>
                        </View>

                        <View style={styles.inputContainer} accessibilityLabel='view2'> 
                            <FontAwesome name="user-circle-o" style={styles.inputIcon}/>   
                            <TextInput 
                                style={styles.input}
                                placeholder='Email'
                                placeholderTextColor="white"
                                underlineColorAndroid="transparent"
                                secureTextEntry={false}
                                keyboardType='email-address'
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                                accessibilityLabel='email'
                                onSubmitEditing={()=>props.handleSubmit()}
                            />
                        </View>  
                        <Text style={styles.errorText} accessibilityLabel='emailError'>{props.touched.email && props.errors.email}</Text>

                        <View style={styles.inputContainer}> 
                            <AntDesign name="lock" style={styles.inputIcon}/>  
                            <TextInput 
                                style={styles.input}
                                placeholder='Password'
                                placeholderTextColor="white"
                                underlineColorAndroid="transparent"
                                secureTextEntry={true}
                                keyboardType='default'
                                onChangeText={props.handleChange('password')}
                                value={props.values.password}
                                accessibilityLabel='password'
                                onSubmitEditing={()=>props.handleSubmit()}
                            />
                        </View>  
                        <Text style={styles.errorText} accessibilityLabel='passwordError'>{props.touched.password && props.errors.password}</Text>

                        <TouchableOpacity accessibilityLabel='submit' style={styles.loginbutton} disabled={isLoading} onPress={()=>{props.handleSubmit();}}>
                            <Text style={styles.logintext}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                    </KeyboardAvoidingView>
                )}    
                </Formik>
            <View style={styles.bottom}>
                <Text style={styles.bottomtext} accessibilityLabel='signup' disabled={isLoading} onPress={()=>navigation.navigate('SignUp')}>Create Account</Text>
                <Text style={styles.bottomtext} accessibilityLabel='forget' disabled={isLoading} onPress={()=>navigation.navigate('ForgotP')}>Forgot Password?</Text>
            </View>
        </View>
    </ImageBackground>
);
}


import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import {styles} from '../styles/forgotPScreen';
import {Formik} from 'formik';
import * as yup from 'yup';
import {forgotPassword} from "../api/user";

const validationSchema = yup.object({
    email: yup.string().required().email(),
});

export const ForgotPasswordScreen = ({navigation}) => {

    const [isLoading, setIsLoading] = React.useState(false);

    return(
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage} accessibilityLabel='loginscreen'>
        <View flex={1} style={{opacity: isLoading ? 0.3 : 1.0}} accessibilityLabel='view1'>
                       
                <Formik 
                    initialValues={{email:''}}
                    validationSchema={validationSchema} 
                    onSubmit={
                        (values, actions)=>{
                            setIsLoading(true);
                            forgotPassword({values})
                            .then((response)=>{
                                console.log(response)
                                if (response.message==='Verification code has sent'){
                                    navigation.navigate('Verify', {email: values.email})
                                    setIsLoading(false);
                                }else if (response.error==="No user found"){
                                    Alert.alert('Alert',"Email is invalid",[{text: 'OK', onPress: ()=>actions.resetForm()}])
                                    setIsLoading(false);
                                }else{
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
                            <FontAwesome5 name="lock" color="white" size={40} /> 
                            <Text style={styles.headerText} accessibilityLabel='text1'>Forgot Password?</Text>
                            <Text style={styles.smallHeader} accessibilityLabel='text01'>We just need your registered email address</Text>
                            <Text style={styles.smallHeader} accessibilityLabel='text01'>to send your password reset token.</Text>
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

                        <TouchableOpacity accessibilityLabel='submit' style={styles.loginbutton} disabled={isLoading} onPress={()=>{props.handleSubmit();}}>
                            <Text style={styles.logintext}>NEXT</Text>
                        </TouchableOpacity>
                    </View>
                    </KeyboardAvoidingView>
                )}    
                </Formik>
            <View style={styles.bottom}>
                <Text style={styles.bottomtext} accessibilityLabel='login' disabled={isLoading} onPress={()=>navigation.navigate('Login')}>Back To Login</Text>
                <Text style={styles.bottomtext} accessibilityLabel='signup' disabled={isLoading} onPress={()=>navigation.navigate('SignUp')}>Create Account</Text>
            </View>
        </View>
    </ImageBackground>
);
}


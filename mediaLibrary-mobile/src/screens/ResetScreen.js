import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Keyboard} from 'react-native';
import {styles} from '../styles/loginscreen';
import { Entypo, FontAwesome5, AntDesign } from '@expo/vector-icons';
import {Formik} from 'formik'
import * as yup from 'yup';
import {resetPassword} from "../api/user";

const validationSchema = yup.object({
    password: yup.string().required().min(5),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')],"Password doesn't match")
});

export const ResetScreen = ({navigation, route}) => {

    const [isLoading, setIsLoading] = React.useState(false);

    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage} accessibilityLabel='signupscreen'>
            <View flex={1} style={{opacity: isLoading ? 0.3 : 1.0}} accessibilityLabel='view'>
                    <Formik 
                        accessibilityLabel='form'
                        initialValues={{password:'', confirmPassword:''}}
                        validationSchema={validationSchema} 
                        onSubmit={
                            (values, actions)=>{
                                setIsLoading(true);
                                resetPassword({password: values.password, token: route.params.resetToken})
                                .then((response)=>{
                                    setIsLoading(false);
                                    if (response.message==='Password changed successfully'){
                                        Alert.alert('Alert','Password reset successfully',[{text: 'OK', onPress: ()=>navigation.navigate('Login')}]);
                                    }
                                    else{
                                        Alert.alert('Alert','Something went wrong',[{text: 'OK', onPress: ()=>actions.resetForm()}]);

                                    }
                                })
                                .catch((error)=>{console.log(error)});;
                        }}
                    >
                    {(props)=>(
                        <KeyboardAvoidingView flex={3} behavior='padding'>
                        <View style={styles.form}>

                            <View style={styles.headerContainer}>
                                <FontAwesome5 name="lock" color="white" size={40} />  
                                <Text style={styles.headerText}>Reset Password</Text>
                            </View>

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
                                <Text style={styles.logintext}>RESET</Text>
                            </TouchableOpacity>
                        </View>
                        </KeyboardAvoidingView>
                    )}    
                    </Formik>
            
                <View style={styles.bottom}>
                    <Text accessibilityLabel='loginbutton' style={styles.bottomtext} disabled={isLoading} onPress={()=>navigation.navigate('Login')}>Back To Login?  Click Here</Text>
                </View>
            </View>
        </ImageBackground>
    ); 
}
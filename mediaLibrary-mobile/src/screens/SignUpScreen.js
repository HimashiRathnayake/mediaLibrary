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
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <View flex={1} style={{opacity: isLoading ? 0.3 : 1.0}}>
                <View style={styles.headerContainer}>
                    <Entypo name="folder-video" color="white" size={40} /> 
                    <Text style={styles.headerText}>SignUp Here To Continue</Text>
                </View>
                
                    <Formik 
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
                                        signUp({token:response.token, email:values.email});
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
                        <KeyboardAvoidingView flex={4} behavior='padding'>
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
                                    value={props.values.email}
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
                            <TouchableOpacity style={styles.loginbutton} disabled={isLoading} onPress={()=>{props.handleSubmit();}}>
                                <Text style={styles.logintext}>SIGNUP</Text>
                            </TouchableOpacity>
                        </View>
                        </KeyboardAvoidingView>
                    )}    
                    </Formik>
            
                <View style={styles.bottom}>
                    <Text style={styles.bottomtext} disabled={isLoading} onPress={()=>navigation.navigate('Login')}>Already have an account?</Text>
                </View>
            </View>
        </ImageBackground>
    );
}
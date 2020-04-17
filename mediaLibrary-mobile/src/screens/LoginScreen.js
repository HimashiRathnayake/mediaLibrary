import React from 'react';
import { ImageBackground, View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import { Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {styles} from '../styles/loginscreen';
import {Formik} from 'formik';
import * as yup from 'yup';
import {login} from "../api/user";
import {AuthContext} from '../navigators/context';

const validationSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
});

export const LoginScreen = ({navigation}) => {

    const [isLoading, setIsLoading] = React.useState(false);
    const {signIn} = React.useContext(AuthContext); 

    return(
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
        <View flex={1} style={{opacity: isLoading ? 0.3 : 1.0}}>
            <View style={styles.headerContainer}>
                <Entypo name="folder-video" color="white" size={40} /> 
                <Text style={styles.headerText}>Login Here To Continue</Text>
            </View>
            <KeyboardAwareScrollView>
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

                        <TouchableOpacity style={styles.loginbutton} disabled={isLoading} onPress={()=>{props.handleSubmit();}}>
                            <Text style={styles.logintext}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                )}    
                </Formik>
            </KeyboardAwareScrollView>
            <View style={styles.bottom}>
                <Text style={styles.bottomtext} disabled={isLoading} onPress={()=>navigation.navigate('SignUp')}>Create Account</Text>
                <Text style={styles.bottomtext} disabled={isLoading}>Forgot Password?</Text>
            </View>
        </View>
    </ImageBackground>
);
}


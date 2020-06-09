import React, {useState} from 'react';
import { ImageBackground, View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import {styles} from '../styles/verifyscreen';
import {Formik} from 'formik';
import * as yup from 'yup';
import {verifyResetToken} from "../api/user";
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';
const validationSchema = yup.object({
    token: yup.string().required().min(10),
});

export const VerifyScreen = ({navigation, route}) => {

    const [isLoading, setIsLoading] = React.useState(false);
    const CELL_COUNT = 10;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    return(
    <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage} accessibilityLabel='loginscreen'>
        <View flex={1} style={{opacity: isLoading ? 0.3 : 1.0}} accessibilityLabel='view1'>
                       
                <Formik 
                    initialValues={{token:''}}
                    validationSchema={validationSchema} 
                    onSubmit={
                        (values, actions)=>{
                            setIsLoading(true);
                            verifyResetToken({token: values.token})
                            .then((response)=>{
                                setIsLoading(false);
                                console.log(response)
                                if (response.message==='Verification code has sent'){
                                    navigation.navigate('Verify')
                                }else if (response.message==="No user found"){
                                    Alert.alert('Alert',"Email is invalid",[{text: 'OK', onPress: ()=>actions.resetForm()}])
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
                            {/* <FontAwesome5 name="lock" color="white" size={40} />  */}
                            <Text style={styles.headerText} accessibilityLabel='text1'>Enter Reset Token</Text>
                            <Text style={styles.smallHeader} accessibilityLabel='text01'>Password reset token has been sent to</Text>
                            <Text style={styles.smallHeader} accessibilityLabel='text01'>{route.params.email}</Text>
                        </View>

                        <View style={styles.inputContainer} accessibilityLabel='view2'> 
                            <CodeField
                                ref={ref}
                                {...props}
                                value={props.values.token}
                                onChangeText={props.handleChange('token')}
                                onSubmitEditing={()=>props.handleSubmit()}
                                cellCount={CELL_COUNT}
                                rootStyle={styles.codeFiledRoot}
                                keyboardType="default"
                                textContentType="oneTimeCode"
                                renderCell={({index, symbol, isFocused}) => (
                                <Text
                                    key={index}
                                    style={[styles.cell, isFocused && styles.focusCell]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                                )}
                            />
                        </View>  
                        <Text style={styles.errorText} accessibilityLabel='emailError'>{props.touched.email && props.errors.email}</Text>

                        <TouchableOpacity accessibilityLabel='submit' style={styles.loginbutton} disabled={isLoading} onPress={()=>{props.handleSubmit();}}>
                            <Text style={styles.logintext}>RESET PASSWORD</Text>
                        </TouchableOpacity>
                    </View>
                    </KeyboardAvoidingView>
                )}    
                </Formik>
            <View style={styles.bottom}>
                <Text style={styles.bottomtext} accessibilityLabel='login' disabled={isLoading} onPress={()=>navigation.navigate('Login')}>Back To Login</Text>
                <Text style={styles.bottomtext} accessibilityLabel='forgotP' disabled={isLoading} onPress={()=>navigation.navigate('ForgotP')}>Sent Reset Token Again</Text>
            </View>
        </View>
    </ImageBackground>
);
}


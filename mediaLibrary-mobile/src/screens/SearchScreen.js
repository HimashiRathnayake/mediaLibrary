import React from 'react';
import {ImageBackground, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, View, KeyboardAvoidingView, Alert} from 'react-native';
import {Header} from '../commons/Header';
import {styles} from '../styles/commons';
import {Formik} from 'formik';

export const SearchScreen = ({route,navigation}) => {
    const type=route.params.type;

    return(
        <ImageBackground source={require('../../assets/bg.jpeg')} style={styles.backgroundImage}>
            <Header navigation={navigation}>Search {type}s</Header>
            <KeyboardAvoidingView flex={1} behavior='height'>

            <Formik 
                initialValues={{title:'', subject:'', artist:'', album:'', year:''}}
                onSubmit={
                    (values, actions)=>{
                        console.log(values.title==='' && values.subject===''&& values.artist===''&& values.album===''&& values.year==='');
                        if (values.title==='' && values.subject===''&& values.artist===''&& values.album===''&& values.year===''){
                            Alert.alert('First enter what you want to search','',[
                                {text: 'Ok'},
                            ])
                        }else{
                            navigation.push('Result',{type:type, values:values});
                            actions.resetForm();
                        }
                    }
                }
            >
                {(props)=>(
                    <View style={searchStyle.searchView}>

                        {type==='Image' &&
                            <View>
                                <TextInput 
                                    style={searchStyle.input}
                                    placeholder='Title'
                                    placeholderTextColor="white"
                                    underlineColorAndroid="transparent"
                                    onChangeText={props.handleChange('title')}
                                    value={props.values.title}
                                />
                                <TextInput 
                                    style={searchStyle.input}
                                    placeholder='Subject'
                                    placeholderTextColor="white"
                                    underlineColorAndroid="transparent"
                                    onChangeText={props.handleChange('subject')}
                                    value={props.values.subject}
                                />
                                <TextInput 
                                    style={searchStyle.input}
                                    placeholder='Artist'
                                    placeholderTextColor="white"
                                    underlineColorAndroid="transparent"
                                    onChangeText={props.handleChange('artist')}
                                    value={props.values.artist}
                                />
                            </View>}

                            {type==='Audio' &&
                            <View>
                                <TextInput 
                                    style={searchStyle.input}
                                    placeholder='Title'
                                    placeholderTextColor="white"
                                    underlineColorAndroid="transparent"
                                    onChangeText={props.handleChange('title')}
                                    value={props.values.title}
                                />
                                <TextInput 
                                    style={searchStyle.input}
                                    placeholder='Album'
                                    placeholderTextColor="white"
                                    underlineColorAndroid="transparent"
                                    onChangeText={props.handleChange('album')}
                                    value={props.values.album}
                                />
                                <TextInput 
                                    style={searchStyle.input}
                                    placeholder='Artist'
                                    placeholderTextColor="white"
                                    underlineColorAndroid="transparent"
                                    onChangeText={props.handleChange('artist')}
                                    value={props.values.artist}
                                />
                                <TextInput 
                                    style={searchStyle.input}
                                    placeholder='Year'
                                    placeholderTextColor="white"
                                    underlineColorAndroid="transparent"
                                    onChangeText={props.handleChange('year')}
                                    value={props.values.year}
                                />
                            </View>}

                            {type==='Video' &&
                            <View>
                                <TextInput 
                                    style={searchStyle.input}
                                    placeholder='Title'
                                    placeholderTextColor="white"
                                    underlineColorAndroid="transparent"
                                    onChangeText={props.handleChange('title')}
                                    value={props.values.title}
                                />
                                <TextInput 
                                    style={searchStyle.input}
                                    placeholder='Artist'
                                    placeholderTextColor="white"
                                    underlineColorAndroid="transparent"
                                    onChangeText={props.handleChange('artist')}
                                    value={props.values.artist}
                                />
                            </View>}                            

                        <TouchableOpacity style={searchStyle.submitButton} onPress={()=>{props.handleSubmit();}}>
                            <Text style={searchStyle.submitText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
            </KeyboardAvoidingView>

        </ImageBackground>
    );
}

const searchStyle = StyleSheet.create({
    searchView: {
        flex:1,
        marginTop: -150,
        justifyContent: 'center'
    },
    searchCriteria:{
        width: Dimensions.get('screen').width - 100,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 30,
        height: 50,
        justifyContent: 'center'
    },
    criteriaText:{
        color: '#ffffff',
        marginLeft: 50,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: Dimensions.get('screen').width - 100,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingLeft: 60,
        borderRadius: 30,
        color: '#ffffff',
        marginTop: 20
    },
    submitButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1976d2',
        height: 50,
        borderRadius: 20,
        zIndex: 100,
        width: 200,
        alignSelf: 'center',
        marginTop: 20
    },
    submitText: {
        color: 'white',
        backgroundColor: 'transparent',
    },
    searchText: {
        marginLeft: 20,
        color: '#9e9e9e',
        fontSize: 16,
        marginTop: 10
    }
});
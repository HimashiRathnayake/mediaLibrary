import React from 'react';
import {Dimensions, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const SettingsScreen = ({route,navigation}) => {
    return(
        <View style={styles.backgroundImage}>
            <View flexDirection='row' style={styles.settingHeader}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name='md-arrow-back' style={styles.icon}/>  
                </TouchableOpacity>
                <Text style={{fontWeight: 'bold', fontSize:20, marginTop:15, marginLeft:20}}>Settings </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    settingHeader: {
        elevation:6, 
        backgroundColor:'#fff',
        alignSelf:'center', 
        width:Dimensions.get('screen').width-10, 
        height:60,
        marginTop: 25,
        shadowColor: 'black',  
    },
    icon: {
        fontSize: 30,
        color:"black",
        fontSize:32,
        marginTop: 14,
        marginLeft: 20
    },
});
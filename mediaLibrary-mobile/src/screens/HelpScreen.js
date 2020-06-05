import React from 'react';
import {Text, View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export const HelpScreen = ({route,navigation}) => {
    return(
        <View style={styles.backgroundImage}>
            <View flexDirection='row' style={styles.helpHeader}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name='md-arrow-back' style={styles.icon}/>  
                </TouchableOpacity>
                <Text style={{fontWeight: 'bold', fontSize:20, marginTop:15, marginLeft:20}}>Help & feedback</Text>
            </View>
            <View flexDirection='row' style={styles.helpView}>
                <Text style={styles.helpText}>Upload and store a media file</Text>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <AntDesign name='caretdown' style={styles.helpIcon}/>  
                </TouchableOpacity>
            </View>
            <View flexDirection='row' style={styles.helpView}>
                <Text style={styles.helpText}>Search for a media file</Text>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <AntDesign name='caretdown' style={styles.helpIcon}/>  
                </TouchableOpacity>
            </View>
            <View flexDirection='row' style={styles.helpView}>
                <Text style={styles.helpText}>Share a media file</Text>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <AntDesign name='caretdown' style={styles.helpIcon}/>  
                </TouchableOpacity>
            </View>
            <View flexDirection='row' style={styles.helpView}>
                <Text style={styles.helpText}>Delete a media file</Text>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <AntDesign name='caretdown' style={styles.helpIcon}/>  
                </TouchableOpacity>
            </View>
            <View flexDirection='row' style={styles.helpView}>
                <Text style={styles.helpText}>Rename a media file</Text>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <AntDesign name='caretdown' style={styles.helpIcon}/>  
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    helpHeader: {
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
    helpView:{
        elevation:1, 
        backgroundColor:'#fff',
        alignSelf:'center', 
        width:Dimensions.get('screen').width-10, 
        height:60,
        marginTop: 2,
    },
    helpIcon: {
        fontSize: 22,
        color:"black",
        marginTop: 14,
        marginLeft: 20,
        color: '#1976d2',
    },
    helpText:{
        fontSize:18, 
        marginTop:15,
        marginLeft:20, 
        color: '#1976d2',
    }
});
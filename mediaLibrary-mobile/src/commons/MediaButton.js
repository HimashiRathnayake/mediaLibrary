import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

export const MediaButton = ({children, type, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
            <View style={styles.buttonView}>
                {type==='Image'&&<Entypo name="images" style={styles.icon}/>}
                {type==='Audio'&&<Entypo name="beamed-note" style={styles.icon}/>}
                {type==='Video'&&<MaterialIcons name="video-library" style={styles.icon}/>}
            </View>
            <View>
                <Text style={styles.text}>{children}</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const styles=StyleSheet.create({
    container:{
        flexDirection:'row', 
        alignContent:'center', 
        backgroundColor:'#9e9e9e',
        width:'60%', 
        height: 60,
        alignSelf:'center', 
        padding:5, 
        borderRadius: 30,
        marginBottom: 30,
        shadowOpacity: 10
    },
    buttonView: {
        marginRight:20,
    },
    icon:{
        color:'#1976d2',
        fontSize: 40 ,
        marginLeft: 20  
    },
    text: {
        fontSize:20,
        fontWeight: 'bold',
        color:'#1976d2',
        marginTop: 10
    }
});
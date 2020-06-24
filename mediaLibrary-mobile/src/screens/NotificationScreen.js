import React from 'react';
import {Dimensions, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export const NotificationScreen = ({route,navigation}) => {
    return(
        <View style={styles.backgroundImage}>
            <View flexDirection='row' style={styles.notifyHeader}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name='md-arrow-back' style={styles.icon}/>  
                </TouchableOpacity>
                <Text style={{fontWeight: 'bold', fontSize:20, marginTop:15, marginLeft:20}}>Notifications </Text>
            </View>

            <View>
                <View style={styles.notifyView}>
                    <View style={styles.nameView}>
                        <Text style={{color:'#fff', textAlign: 'center', textAlignVertical:'center', fontWeight: 'bold', fontSize:24}}>T</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.notifyTxt}>Tesarreetrryyryryyyt0@gmail.com has shared an Image</Text>
                        <Text style={styles.date}>6 Ju at 23:30</Text>
                    </View>
                    <MaterialIcons.Button accessibilityLabel='delete' name='delete' underlayColor='transparent' backgroundColor="transparent" color="black" size={25} onPress={()=>alert('true')}/>
                </View>

                <View style={styles.notifyView}>
                    <View style={styles.nameView}>

                    </View>
                    <View style={styles.details}>
                        <Text style={styles.notifyTxt}>T@gmail.com has shared an Image</Text>
                        <Text style={styles.date}>6 Ju at 23:30</Text>
                    </View>
                    <MaterialIcons.Button accessibilityLabel='delete' name='delete' underlayColor='transparent' backgroundColor="transparent" color="black" size={25} onPress={()=>alert('true')}/>
                </View>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    notifyHeader: {
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
    notifyView: {
        width: Dimensions.get('screen').width - 10,
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 5,
    },
    notifyTxt:{
       fontSize: 14,
    },
    date:{
        opacity: 0.4,
        fontSize: 12
    },
    nameView:{
        backgroundColor: 'red',
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    details: {
        marginLeft: 10,
        alignSelf: 'center',
        width: Dimensions.get('screen').width - 110
    }
});
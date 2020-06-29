import React, {useState} from 'react';
import {Dimensions, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {getNotifications} from '../api/notification';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export const NotificationScreen = ({route,navigation}) => {

    const [notifications, setNotifitions] = useState([]);
    const [count, setCount] = useState(null);
    const [refresh, setRefresh] = useState(false);
    let type;

    React.useEffect(()=>{  
        navigation.addListener('focus', ()=>{
            setRefresh(true);
        });
        getNotifications()
        .then((response)=>{
            setCount(response.count);
            setNotifitions(response.notifications); 
        })
        .catch((error)=>{
            console.log(error)
        })
        setRefresh(false);
    },[refresh])

    const notificationSet = notifications.map((val,key)=>{
        if(val.type=='SharedImage'){
            type='an image';
        }
        else if(val.type=='SharedAudio'){
            type='an audio';
        }
        else{
            type='a video';
        }
        
        return(
            <View style={styles.notifyView} key={key}>
                <View style={styles.nameView}>
                    <Text style={{color:'#fff', textAlign: 'center', textAlignVertical:'center', fontWeight: 'bold', fontSize:24}}>
                        {val.sender.email.substring(0,1).toUpperCase()}
                    </Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.notifyTxt}>{val.sender.email} has shared {type}</Text>
                    <Text style={styles.date}>{val.date.substring(0,4)} {val.date.substring(5,7)=='01'&&'Jan'}
                    {val.date.substring(5,7)=='02'&&'Feb'}
                    {val.date.substring(5,7)=='03'&&'Mar'}
                    {val.date.substring(5,7)=='04'&&'Apr'}
                    {val.date.substring(5,7)=='05'&&'May'} 
                    {val.date.substring(5,7)=='06'&&'Jun'}
                    {val.date.substring(5,7)=='07'&&'Jul'}
                    {val.date.substring(5,7)=='08'&&'Aug'}
                    {val.date.substring(5,7)=='09'&&'Sep'}
                    {val.date.substring(5,7)=='10'&&'Oct'}
                    {val.date.substring(5,7)=='11'&&'Nov'} 
                    {val.date.substring(5,7)=='12'&&'Dec'} {val.date.substring(11,16)}</Text>
                </View>
                <MaterialIcons.Button accessibilityLabel='delete' name='delete' underlayColor='transparent' backgroundColor="transparent" color="black" size={25} onPress={()=>alert('true')}/>
            </View>

        )
    })
 
    return(
        <View style={styles.backgroundImage}>
            <View flexDirection='row' style={styles.notifyHeader}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name='md-arrow-back' style={styles.icon}/>  
                </TouchableOpacity>
                <Text style={{fontWeight: 'bold', fontSize:20, marginTop:15, marginLeft:20}}>Notifications </Text>
            </View>

            <View>
                {notificationSet}
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
        marginTop: 8,
    },
    notifyTxt:{
       fontSize: 15,
    },
    date:{
        opacity: 0.4,
        fontSize: 12
    },
    nameView:{
        backgroundColor: 'rgba(25,118,210,0.5)',
        width: 40,
        height: 40,
        borderRadius: 100,
        justifyContent: 'center'
    },
    details: {
        marginLeft: 10,
        alignSelf: 'center',
        width: Dimensions.get('screen').width - 110
    }
});
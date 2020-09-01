import React, {useState} from 'react';
import {Dimensions, Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {getNotifications, deleteNotification, changeState} from '../api/notification';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export const NotificationScreen = ({route,navigation}) => {

    const [notifications, setNotifitions] = useState([]);
    const [count, setCount] = useState(null);
    const [refresh, setRefresh] = useState(false);
    let type;

    function deleteNotificationWithId(notificationId){
        deleteNotification({notificationId: notificationId})
        .then((response)=>{
            console.log(response);
            setRefresh(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    function changeToRead(notificationId){
        changeState({notificationId: notificationId})
        .then((response)=>{
            console.log(response);
            setRefresh(true);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

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
            <View style={[styles.notifyView, {backgroundColor: (val.state=='unread')? 'rgba(25,118,210,0.15)': '#fff'}]} key={key}>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>changeToRead(val._id)}>
                    <View style={styles.nameView}>
                        <Text style={{color:'#fff', textAlign: 'center', textAlignVertical:'center', fontWeight: 'bold', fontSize:24}}>
                            {val.sender.email.substring(0,1).toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={[styles.notifyTxt, {fontWeight:(val.state=='unread')?'bold':'normal'}]}>{val.sender.email} has shared {type}</Text>
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
                </TouchableOpacity>

                <MaterialIcons.Button accessibilityLabel='delete' name='delete' underlayColor='transparent' backgroundColor="transparent" color="black" size={25} onPress={()=>deleteNotificationWithId(val._id)}/>
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

            <View style={styles.notifications}>
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
    notifications:{
        marginTop: 2,
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
        padding:3,
        elevation: 0.3
    },
    notifyTxt:{
       fontSize: 15,
       marginTop: 2
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
        justifyContent: 'center',
        marginTop: 5,
        marginLeft:2
    },
    details: {
        marginLeft: 10,
        alignSelf: 'center',
        width: Dimensions.get('screen').width - 110
    }
});
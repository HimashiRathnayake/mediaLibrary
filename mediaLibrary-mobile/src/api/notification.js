import { AsyncStorage } from "react-native";

const serverUrl = 'https://mymedia-app-backend.herokuapp.com';

export async function getNotifications(){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/notification/',{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+token 
        }
    })
    .then((response)=>response.json())
    .then((json)=>{
        console.log(json)
        return json;
    })
    .catch((error)=>{
        console.log(error)
    })
}

export async function getUnreadCount(){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/notification/count',{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+token 
        }
    })
    .then((response)=>response.json())
    .then((json)=>{
        console.log(json)
        return json;
    })
    .catch((error)=>{
        console.log(error)
    })
}

export async function deleteNotification({notificationId}){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/notification/'+notificationId,{
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+token 
        }
    })
    .then((response)=>response.json())
    .then((json)=>{
        return json;
    })
    .catch((error)=>{
        console.log(error)
    })
}

export async function changeState({notificationId}){
    var token = await AsyncStorage.getItem('userToken')
    console.log(notificationId);
    return fetch(serverUrl+'/notification/'+notificationId,{
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+token 
        }
    })
    .then((response)=>response.json())
    .then((json)=>{
        console.log(json);
        return json;
    })
    .catch((error)=>{
        console.log(error)
    })
}

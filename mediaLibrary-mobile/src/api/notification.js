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
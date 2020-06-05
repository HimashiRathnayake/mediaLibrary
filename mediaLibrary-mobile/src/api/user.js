import { AsyncStorage } from "react-native";

const serverUrl = 'https://mymedia-app-backend.herokuapp.com';

export function signup({values}){
    return fetch(serverUrl+'/user/signup',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email: values.email,
            password: values.password
        })
    })
    .then((response)=>response.json())
    .then((json)=>{
        return json
    })
    .catch((error)=>{
        console.log(error)
    })
}

export function login({values}){
    return fetch(serverUrl+'/user/login',{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email: values.email,
            password: values.password
        })
    })
    .then((response)=>response.json())
    .then((json)=>{
        return json
    })
    .catch((error)=>{
        return error
    })
}

export async function getOtherUsers(text){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/user/'+text,{
        method: 'GET',
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


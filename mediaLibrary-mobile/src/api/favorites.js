import { AsyncStorage } from "react-native";

const serverUrl = 'https://mymedia-app-backend.herokuapp.com';

export async function getFavourites(type){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/favorite/'+type,{
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

export async function addToFavourite(type, fileId){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/favorite/add/'+type+'/'+fileId,{
        method: 'POST',
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

export async function removeFromFavorites(type, fileId){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/favorite/remove/'+type+'/'+fileId,{
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

export async function getIsFavorite(type, fileId){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/favorite/'+type+'/'+fileId,{
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



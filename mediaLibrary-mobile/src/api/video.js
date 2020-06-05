import { AsyncStorage } from "react-native";

const serverUrl = 'https://mymedia-app-backend.herokuapp.com';

export async function getVideos(){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/videos/',{
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

export async function uploadVideo({folderId,uri,name}){
    var token = await AsyncStorage.getItem('userToken')
    let body = new FormData();
    body.append('file', {uri:uri, type:'video/mp4', name:name});
    return fetch(serverUrl+'/videos/'+folderId,{
        method: 'POST',
        headers: {
            'Content-Type':'multipart/form-data',
            'Authorization': 'Bearer '+token 
        },
        body: body
    })
    .then((response)=>response.json())
    .then((json)=>{
        return json;
    })
    .catch((error)=>{
        console.log('error'+error)
    })
}

export async function getVideosInFolder({folderId}){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/videos/'+folderId,{
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

export async function deleteVideo({videoId}){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/videos/'+videoId,{
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

export async function renameVideo({videoId, name}){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/videos/'+videoId,{
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+token 
        },
        body: JSON.stringify({
            videoName: name
        })
    })
    .then((response)=>response.json())
    .then((json)=>{
        return json;
    })
    .catch((error)=>{
        console.log(error)
    })
}
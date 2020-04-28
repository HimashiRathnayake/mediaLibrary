import { AsyncStorage } from "react-native";

const serverUrl = 'http://192.168.1.4:3000';

export async function getAudios(){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/audios/',{
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

export async function uploadAudio({folderId,uri,name}){
    var token = await AsyncStorage.getItem('userToken')
    let body = new FormData();
    body.append('file', {uri:uri, type:'audio/mp3', name:name});
    return fetch(serverUrl+'/audios/'+folderId,{
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

export async function getAudiosInFolder({folderId}){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/audios/'+folderId,{
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

export async function deleteAudio({audioId}){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/audios/'+audioId,{
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

export async function renameAudio({audioId, name}){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/audios/'+audioId,{
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+token 
        },
        body: JSON.stringify({
            audioName: name
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
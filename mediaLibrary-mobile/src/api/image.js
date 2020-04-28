import { AsyncStorage } from "react-native";

const serverUrl = 'http://192.168.1.4:3000';

export async function getImages(){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/images/',{
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

export async function getImagesInFolder({folderId}){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/images/'+folderId,{
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

export async function uploadImage({folderId,uri,type}){
    var token = await AsyncStorage.getItem('userToken')
    let body = new FormData();
    body.append('file', {uri:uri, type:'image/'+type, name:'IMG_'+Math.random(4000)});
    return fetch(serverUrl+'/images/'+folderId,{
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

export async function deleteImage({imageId}){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/images/'+imageId,{
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

export async function renameImage({imageId, name}){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/images/'+imageId,{
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+token 
        },
        body: JSON.stringify({
            imageName: name
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


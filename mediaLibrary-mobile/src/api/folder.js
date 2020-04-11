import { AsyncStorage } from "react-native"

const serverUrl = 'http://192.168.1.4:3000';

export async function createFolder({name,type}){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/folders/'+type,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer '+token
        },
        body: JSON.stringify({
            folderName: name,
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

export async function getFolders({type}){
    var token = await AsyncStorage.getItem('userToken')

    return fetch(serverUrl+'/folders/'+type,{
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

export async function deleteFolder({folderId}){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/folders/'+folderId,{
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

export async function renameFolder({name, folderId}){
    var token = await AsyncStorage.getItem('userToken')
    return fetch(serverUrl+'/folders/'+folderId,{
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+token 
        },
        body: JSON.stringify({
            folderName: name,
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
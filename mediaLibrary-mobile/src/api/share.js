import { AsyncStorage } from "react-native";

const serverUrl = 'http://192.168.1.4:3000';

export async function shareFile(userId, type, fileId){
    var token = await AsyncStorage.getItem('userToken')
    let shareUrl = serverUrl+'/share/';
    if (type==='Audio'){shareUrl+='audio'}
    else if (type==='Video'){shareUrl+='video'}
    else{shareUrl+='image'}
    shareUrl = shareUrl + '/'+fileId+'/'+userId;

    return fetch(shareUrl,{
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+token 
        },
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

export async function removeUser(userId, fileId, type){
    var token = await AsyncStorage.getItem('userToken')
    let shareUrl = serverUrl+'/share/remove/';
    if (type==='Audio'){shareUrl+='audio'}
    else if (type==='Video'){shareUrl+='video'}
    else{shareUrl+='image'}
    shareUrl = shareUrl + '/'+fileId+'/'+userId;

    return fetch(shareUrl,{
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+token 
        },
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

import { AsyncStorage } from "react-native";

const serverUrl = 'https://mymedia-app-backend.herokuapp.com';

export async function searchFiles({ type, title, album, artist, year, subject}){
    var token = await AsyncStorage.getItem('userToken')
    let searchUrl = serverUrl+'/search/';
    if (type==='Image'){searchUrl+='image/?'}
    else if (type==='Audio'){searchUrl+='audio/?'}
    else{searchUrl+='video/?'}
    if (title!=undefined && title!==''){searchUrl+='title='+title+'&'}
    if (album!=undefined && album!==''){searchUrl+='album='+album+'&'}
    if (artist!=undefined && artist!==''){searchUrl+='artist='+artist+'&'}
    if (year!=undefined && year!==''){searchUrl+='year='+year+'&'}
    if (subject!=undefined && subject!==''){searchUrl+='subject='+subject+'&'}
    searchUrl = searchUrl.substring(0,searchUrl.length-1)
    console.log(searchUrl)
    return fetch(searchUrl,{
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

export async function searchOverall(text, type, criteria){
    var token = await AsyncStorage.getItem('userToken')
    let searchUrl = serverUrl+'/search/'+type+'/'+criteria+'/'+text;
    console.log(searchUrl)
    return fetch(searchUrl,{
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
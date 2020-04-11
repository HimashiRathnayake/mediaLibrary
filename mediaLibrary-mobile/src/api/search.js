import { AsyncStorage } from "react-native";

const serverUrl = 'http://192.168.1.4:3000';

export async function searchFiles({ type, title, album, artist, year, subject}){
    var token = await AsyncStorage.getItem('userToken')
    let searchUrl = serverUrl+'/search/';
    if (type==='Image'){searchUrl+='image/'}
    else if (type==='Audio'){searchUrl+='audio/'}
    else{searchUrl+='video/'}
    if (title!=undefined && title!==''){searchUrl+='?title='+title}
    if (album!=undefined && album!==''){searchUrl+='?album='+album}
    if (artist!=undefined && artist!==''){searchUrl+='?artist='+artist}
    if (year!=undefined && year!==''){searchUrl+='?year='+year}
    if (subject!=undefined && subject!==''){searchUrl+='?subject='+subject}
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
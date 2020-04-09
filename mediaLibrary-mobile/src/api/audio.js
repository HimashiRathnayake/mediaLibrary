export function getAudios({token}){
    return fetch('http://192.168.1.4:3000/audios/',{
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

export function uploadAudio({folderId,uri,token,name}){
    let body = new FormData();
    body.append('file', {uri:uri, type:'audio/mp3', name:name});
    return fetch('http://192.168.1.4:3000/audios/'+folderId,{
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

export function getAudiosInFolder({token,folderId}){
    return fetch('http://192.168.1.4:3000/audios/'+folderId,{
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
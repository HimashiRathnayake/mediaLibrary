export function getImages({token}){
    return fetch('http://192.168.1.4:3000/images/',{
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

export function getImagesInFolder({token,folderId}){
    return fetch('http://192.168.1.4:3000/images/'+folderId,{
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

export function uploadImage({folderId,uri,token,type}){
    let body = new FormData();
    body.append('file', {uri:uri, type:'image/'+type, name:'IMG_'+Math.random(4000)});
    return fetch('http://192.168.1.4:3000/images/'+folderId,{
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




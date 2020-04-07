export function createFolder({name,type,token}){
    return fetch('http://192.168.1.4:3000/folders/'+type,{
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

export function getFolders({token, type}){
    return fetch('http://192.168.1.4:3000/folders/'+type,{
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

export function deleteFolder({token, folderId}){
    return fetch('http://192.168.1.4:3000/folders/'+folderId,{
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

export function renameFolder({name, folderId, token}){
    return fetch('http://192.168.1.4:3000/folders/'+folderId,{
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
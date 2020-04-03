export function createFolder({name,type}){
    return fetch('http://192.168.1.4:3000/folders/'+type,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer'+''
        },
        body: JSON.stringify({
            folderName: name,
        })
    })
    .then((response)=>response.json())
    .then((json)=>{
        return json.message
    })
    .catch((error)=>{
        console.log(error)
    })
}
export function getImages(){
    return fetch('http://192.168.1.4:3000/images/',{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email: values.email,
            password: values.password
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


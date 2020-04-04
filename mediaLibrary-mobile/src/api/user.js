export function signup({values}){
    return fetch('http://192.168.1.4:3000/user/signup',{
        method: 'POST',
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
        return json
    })
    .catch((error)=>{
        console.log(error)
    })
}

export function login({values}){
    return fetch('http://192.168.1.4:3000/user/login',{
        method: 'POST',
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
        return json
    })
    .catch((error)=>{
        return error
    })
}
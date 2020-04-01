export function LoginData(userdata){
    console.log('PostData');
    return new Promise((resolve, reject) => {
        fetch('http://localhost:3001/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userdata)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson);
        })
        .catch((error) => {
            reject(error);
        })
    });

}

export function SignUpData(userdata){
    console.log('PostData');
    return new Promise((resolve, reject) => {
        fetch('http://localhost:3001/user/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userdata)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson);
        })
        .catch((error) => {
            reject(error);
        })
    });

}

export function GetFolders(userdata){
    console.log('PostData');
    return new Promise((resolve, reject) => {
        fetch('http://localhost:3001/folders/Image', {
            method: 'Get',
            headers: {
                'Authorization': `Bearer ${userdata}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson);
        })
        .catch((error) => {
            reject(error);
        })
    });

}


export function GetAllImages(userdata){
    console.log('PostData');
    return new Promise((resolve, reject) => {
        fetch('http://localhost:3001/images/', {
            method: 'Get',
            headers: {
                'Authorization': `Bearer ${userdata}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson);
        })
        .catch((error) => {
            reject(error);
        })
    });

}

export function GetImagesFromFolder(userdata, folderId){
    console.log('PostData');
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3001/images/${folderId}`, {
            method: 'Get',
            headers: {
                'Authorization': `Bearer ${userdata}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
            //params: folderId
        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson);
        })
        .catch((error) => {
            reject(error);
        })
    });

}
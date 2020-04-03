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

export function DeleteFolder(userdata, folderId){
    console.log('PostData');
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3001/folders/${folderId}`, {
            method: 'Delete',
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

export function DeleteImage(userdata, imageId){
    console.log('PostData');
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3001/images/${imageId}`, {
            method: 'Delete',
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

export function CreateFolders(userdata, type, folderName){
    console.log('PostData', JSON.stringify(folderName));
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3001/folders/${type}`, {
            method: 'Post',
            headers: {
                'Authorization': `Bearer ${userdata}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                folderName: folderName
            })
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

export function RenameFolder(userdata, type, folderId, folderName){
    console.log('PostData', `http://localhost:3001/${type}/${folderId}`);
    return new Promise((resolve, reject) => {
        if(type==='folders'){
            fetch(`http://localhost:3001/${type}/${folderId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${userdata}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    folderName: folderName
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
        }
        else if(type === 'images'){
            fetch(`http://localhost:3001/${type}/${folderId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${userdata}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    imageName: folderName
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                reject(error);
            })
        }
        
        
    });

}

export function UploadFiles(userdata, type, folderId, file){
    console.log('UploadFiles', `http://localhost:3001/${type}/${folderId}`);
    const fd =new FormData();
    
    fd.append('file', file);

    console.log('fd: ', fd); 
    console.log('boundary:', fd._boundary);

    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3001/${type}/${folderId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userdata}`,
                'Accept': 'application/json'
            },
            body: fd
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



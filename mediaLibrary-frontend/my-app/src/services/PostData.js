export function LoginData(userdata){
    console.log('PostData');
    return new Promise((resolve, reject) => {
        fetch('http://localhost:3000/user/login', {
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
        fetch('http://localhost:3000/user/signup', {
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

export function GetFolders(userdata, type){
    console.log('PostData');
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/folders/${type}`, {
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


export function GetAll(userdata, type){
    console.log('PostData');
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/${type}`, {
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

export function GetFromFolder(userdata, type, folderId){
    console.log('PostData');
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/${type}/${folderId}`, {
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
        fetch(`http://localhost:3000/folders/${folderId}`, {
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
        fetch(`http://localhost:3000/images/${imageId}`, {
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

export function DeleteVideo(userdata, videoId){
    console.log('PostData Delete video');
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/videos/${videoId}`, {
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

export function DeleteAudio(userdata, audioId){
    console.log('PostData Delete video');
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/audios/${audioId}`, {
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
        fetch(`http://localhost:3000/folders/${type}`, {
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
    console.log('PostData', `http://localhost:3000/${type}/${folderId}`);
    return new Promise((resolve, reject) => {
        if(type==='folders'){
            fetch(`http://localhost:3000/${type}/${folderId}`, {
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
            fetch(`http://localhost:3000/${type}/${folderId}`, {
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
        else if(type === 'videos'){
            fetch(`http://localhost:3000/${type}/${folderId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${userdata}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    videoName: folderName
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
        else if(type === 'audios'){
            fetch(`http://localhost:3000/${type}/${folderId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${userdata}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    audioName: folderName
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
    console.log('UploadFiles', `http://localhost:3000/${type}/${folderId}`);
    const fd =new FormData();
    
    fd.append('file', file);

    console.log('fd: ', fd); 
    console.log('file: ', file); 
    //console.log("file path: ", fd.file.filename);
    console.log('boundary:', fd._boundary);

    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/${type}/${folderId}`, {
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

export function SearchImages(userdata, url){
    console.log('SearchImages', `http://localhost:3000/search/image/?${url}`);
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/search/image/?${url}`, {
            method: 'Get',
            headers: {
                'Authorization': `Bearer ${userdata}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
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

export function SearchVideos(userdata, url){
    console.log('SearchVideos', `http://localhost:3000/search/video/?${url}`);
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/search/video/?${url}`, {
            method: 'Get',
            headers: {
                'Authorization': `Bearer ${userdata}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
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

export function SearchAudios(userdata, url){
    console.log('SearchAudios', `http://localhost:3000/search/audio/?${url}`);
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/search/audio/?${url}`, {
            method: 'Get',
            headers: {
                'Authorization': `Bearer ${userdata}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
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

export function SearchImagebyCriteria(userdata, criteria, parameter){
    console.log('SearchImagebyCCriteria');
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/search/image/${criteria}/${parameter}`, {
            method: 'Get',
            headers: {
                'Authorization': `Bearer ${userdata}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
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

export function SearchAudiobyCriteria(userdata, criteria, parameter){
    console.log('SearchAudiobyCriteria: ', `http://localhost:3000/search/audio/${criteria}/${parameter}`);
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/search/audio/${criteria}/${parameter}`, {
            method: 'Get',
            headers: {
                'Authorization': `Bearer ${userdata}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
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

export function SearchVideobyCriteria(userdata, criteria, parameter){
    console.log('SearchVideobyCriteria');
    return new Promise((resolve, reject) => {
        fetch(`http://localhost:3000/search/video/${criteria}/${parameter}`, {
            method: 'Get',
            headers: {
                'Authorization': `Bearer ${userdata}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
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


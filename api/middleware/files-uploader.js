const express=require('express');
const multer=require('multer');
// const sftpStorage = require('multer-sftp');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req,file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// const storage = sftpStorage({
//     sftp:{
//         host: 'localhost',
//         port: 3000,
//         username: '',
//         password: ''
//     },
//     destination: function(req, file, cb){
//         cb(null, './uploads/');
//     }
// });

const fileFilter = (req,file,cb)=>{
    fileType=req.originalUrl.split("/")[1];
    if (fileType === 'images'){
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        }else{
            cb(null, false);
        }
    }
    else if (fileType === 'audios'){
        if (file.mimetype === 'audio/mp3' || file.mimetype === 'audio/wav'){
            cb(null, true);
        }else{
            cb(null, false);
        }
    }
    else if (fileType === 'audios'){
        if (file.mimetype === 'audio/mp3' || file.mimetype === 'audio/wav'){
            cb(null, true);
        }else{
            cb(null, false);
        }
    }
    else if (fileType === 'videos'){
        if (file.mimetype === 'video/mp4'){
            cb(null, true);
        }else{
            cb(null, false);
        }
    }
    else {
        cb(null, false);
    }    
}

const upload = multer({
    storage: storage,
    fileFilter : fileFilter
});

module.exports = upload;
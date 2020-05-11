var aws = require('aws-sdk'),
multer = require('multer'),
multerS3 = require('multer-s3');
// const sftpStorage = require('multer-sftp');

aws.config.update({
    secretAccessKey: 'sp3cE6P/Vk5lx75c1J0ieHNqGbw7uvoIroTqnmdB',
    accessKeyId: 'AKIAJF4RWB6KLDPH7D6A',
    region: 'ap-south-1',
});

var s3 = new aws.S3();

const bucketName = (req, file, cb)=>{
    fileType=req.originalUrl.split("/")[1];
    if (fileType === 'images'){
        cb(null, 'my-media-images');
    }
    else if (fileType === 'audios'){
        cb(null, 'my-media-audios');
    }
    else if (fileType === 'videos'){
        cb(null, 'my-media-videos');
    }
}

const storage = multerS3({
    s3: s3,
    bucket: bucketName,
    acl: 'public-read',
    contentType: function (req, file, cb) {
        cb(null, file.mimetype); 
    },
    key: function (req, file, cb) {
        console.log(file);
        cb(null, Date.now() + '-' + file.originalname); 
    },
});

const upload = multer({
    storage: storage,
});

module.exports = upload;




// Access Key ID:
// AKIAIUNUAFITHKFMRD6Q
// Secret Access Key:
// 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
//'my-media-images'
// // const storage = sftpStorage({
//     sftp:{
//         host: 'localhost',
//         port: 3000,
//         username: '',
//         password: ''
//     },
//     destination: function(req, file, cb){
//         cb(null, './uploads/');
//     }
// });''


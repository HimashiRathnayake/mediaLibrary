var aws = require('aws-sdk'),
multer = require('multer'),
multerS3 = require('multer-s3');
// const sftpStorage = require('multer-sftp');

aws.config.update({
    secretAccessKey: 'yGt1FaQWb8AU12/E2sQwtYZLu87Rc1f4+EAPBe76',
    accessKeyId: 'AKIAIUNUAFITHKFMRD6Q',
    region: 'ap-south-1',
});

var s3 = new aws.S3();

const storage = multerS3({
    s3: s3,
    bucket: 'my-media-images',
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
// });


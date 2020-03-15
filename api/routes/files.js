const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');
const multer=require('multer');
const sftpStorage = require('multer-sftp');

const FilesController = require ('../controllers/files');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
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

// const fileFilter = (req,file,cb)=>{
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
//         cb(null, true);
//     }else{
//         cb(null, false)
//     }
// }

const upload = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 5
    // },
    // fileFilter : fileFilter
});

// router.post('/', checkAuth, upload.single('file'), FilesController.files_upload_file);
router.post('/', checkAuth, upload.single('file'), FilesController.files_get_metadata);

router.get('/:fileId', checkAuth, FilesController.files_get_file);

module.exports = router;
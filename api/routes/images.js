const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');
const getMetadata=require('../middleware/get-meta-data');
const multer=require('multer');
// const sftpStorage = require('multer-sftp');

const ImagesController = require('../controllers/images');

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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter : fileFilter
});

router.get('/', checkAuth, ImagesController.images_get_all);
router.get('/:folderId', checkAuth, ImagesController.images_get_images_from_folder);
router.post('/:folderId', checkAuth, upload.single('file'), getMetadata, ImagesController.images_upload_image);
router.patch('/:imageId', checkAuth, ImagesController.images_rename_image);
router.delete('/:imageId', checkAuth, ImagesController.images_delete_image);

module.exports = router;
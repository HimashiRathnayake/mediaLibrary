const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');
const audioMetadata=require('../middleware/audio-metaData');
const multer=require('multer');
// const sftpStorage = require('multer-sftp');

const AudiosController = require ('../controllers/audios');

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

const upload = multer({
    storage: storage
});

router.get('/', checkAuth, AudiosController.audios_get_all);
router.get('/:folderId', checkAuth, AudiosController.audios_get_audios_from_folder);
router.post('/:folderId', checkAuth, upload.single('file'), audioMetadata, AudiosController.audios_upload_audio);
router.patch('/:audioId', checkAuth, AudiosController.audios_rename_audio);
router.delete('/:audioId', checkAuth, AudiosController.audios_delete_audio);

module.exports = router;
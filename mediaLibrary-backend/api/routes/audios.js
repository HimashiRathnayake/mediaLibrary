const express=require('express');
const router=express.Router();

const checkAuth=require('../middleware/check-auth');
const getMetadata=require('../middleware/get-meta-data');
const uploader = require('../middleware/files-uploader');

const AudiosController = require ('../controllers/audios');

router.get('/', checkAuth, AudiosController.audios_get_all);
router.get('/:folderId', checkAuth, AudiosController.audios_get_audios_from_folder);
router.post('/:folderId', checkAuth, uploader.single('file'), getMetadata, AudiosController.audios_upload_audio);
router.patch('/:audioId', checkAuth, AudiosController.audios_rename_audio);
router.delete('/:audioId', checkAuth, AudiosController.audios_delete_audio);

module.exports = router;
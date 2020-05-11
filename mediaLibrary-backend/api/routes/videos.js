const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');
const getMetadata=require('../middleware/get-meta-data');
const uploader = require('../middleware/files-uploader');

const VideosController = require ('../controllers/videos');

router.get('/', checkAuth, VideosController.videos_get_all);
router.get('/:folderId', checkAuth, VideosController.videos_get_videos_from_folder);
router.post('/:folderId', checkAuth, uploader.single('file'), getMetadata, VideosController.videos_upload_video);
router.patch('/:videoId', checkAuth, VideosController.videos_rename_video);
router.patch('/:videoId/:folderId', checkAuth, VideosController.videos_move_video);
router.delete('/:videoId', checkAuth, VideosController.videos_delete_video);

module.exports = router; 
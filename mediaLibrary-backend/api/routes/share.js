const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');

const ShareController = require ('../controllers/share');

router.patch('/image/:imageId', checkAuth, ShareController.image_add_user);
router.patch('/audio/:audioId', checkAuth, ShareController.audio_add_user);
router.patch('/video/:videoId', checkAuth, ShareController.video_add_user);
router.patch('/folder/:folderId', checkAuth, ShareController.folder_add_user);

router.get('/sharedImages', checkAuth, ShareController.user_get_shared_images);
router.get('/sharedAudios', checkAuth, ShareController.user_get_shared_audios);
router.get('/sharedVideos', checkAuth, ShareController.user_get_shared_videos);
router.get('/sharedFolders', checkAuth, ShareController.user_get_shared_folders);

module.exports = router;
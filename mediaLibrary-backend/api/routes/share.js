const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');

const ShareController = require ('../controllers/share');

router.patch('/image/:imageId/:userId', checkAuth, ShareController.image_add_user);
router.patch('/audio/:audioId/:userId', checkAuth, ShareController.audio_add_user);
router.patch('/video/:videoId/:userId', checkAuth, ShareController.video_add_user);
router.patch('/folder/:folderId/:userId', checkAuth, ShareController.folder_add_user);

router.get('/sharedImages', checkAuth, ShareController.user_get_shared_images);
router.get('/sharedAudios', checkAuth, ShareController.user_get_shared_audios);
router.get('/sharedVideos', checkAuth, ShareController.user_get_shared_videos);
router.get('/sharedFolders', checkAuth, ShareController.user_get_shared_folders);

router.patch('/remove/image/:imageId/:userId', checkAuth, ShareController.image_remove_user);
router.patch('/remove/audio/:audioId/:userId', checkAuth, ShareController.audio_remove_user);
router.patch('/remove/video/:videoId/:userId', checkAuth, ShareController.video_remove_user);
router.patch('/remove/folder/:folderId/:userId', checkAuth, ShareController.folder_remove_user);

module.exports = router;
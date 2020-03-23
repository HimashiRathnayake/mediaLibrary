const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');
const getMetadata=require('../middleware/get-meta-data');
const uploader = require('../middleware/files-uploader');

const ImagesController = require('../controllers/images');

router.get('/', checkAuth, ImagesController.images_get_all);
router.get('/:folderId', checkAuth, ImagesController.images_get_images_from_folder);
router.post('/:folderId', checkAuth, uploader.single('file'), getMetadata, ImagesController.images_upload_image);
router.patch('/:imageId', checkAuth, ImagesController.images_rename_image);
router.delete('/:imageId', checkAuth, ImagesController.images_delete_image);

module.exports = router;
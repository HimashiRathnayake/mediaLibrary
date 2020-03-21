const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');

const ShareController = require ('../controllers/share');

router.patch('/:fileId', checkAuth, ShareController.file_add_user);
router.post('/:type', checkAuth, FoldersController.folders_create_folder);
router.patch('/:folderId', checkAuth, FoldersController.folders_rename_folder);
router.delete('/:folderId', checkAuth, FoldersController.folders_delete_folder);

module.exports = router;
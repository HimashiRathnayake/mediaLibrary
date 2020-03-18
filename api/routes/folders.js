const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');

const FoldersController = require ('../controllers/folders');

router.get('/:type', checkAuth, FoldersController.folders_get_folders);
router.post('/:type', checkAuth, FoldersController.folders_create_folder);
router.patch('/:folderId', checkAuth, FoldersController.folders_rename_folder);
router.delete('/:folderId', checkAuth, FoldersController.folders_delete_folder);

module.exports = router;
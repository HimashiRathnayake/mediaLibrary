const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');
const AlbumsController = require ('../controllers/albums');

//get albums of the current user
router.get('/', checkAuth, AlbumsController.albums_get_user_albums);

//create new album
router.post('/', checkAuth, AlbumsController.albums_create_new_album);

// router.get('/:fileId', checkAuth, FilesController.files_get_file);

module.exports = router;
const express=require('express');
const router=express.Router();
const checkAuth=require('../middleware/check-auth');
const AlbumsController = require ('../controllers/albums');

router.get('/', checkAuth, AlbumsController.albums_get_user_albums);

router.post('/', checkAuth, AlbumsController.albums_create_new_album);

router.patch('/:albumId', checkAuth, AlbumsController.albums_rename_album);

module.exports = router;
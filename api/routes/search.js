const express =require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const searchController = require('../controllers/search');

/* router.post('/audio', checkAuth, searchController.create_new_audio);
router.post('/video', checkAuth, searchController.create_new_video);
router.post('/image', checkAuth, searchController.create_new_Image);  */

router.get('/audio/artist/:Artist', checkAuth, searchController.search_audio_by_artist );
router.get('/video/artist/:Artist', checkAuth, searchController.search_video_by_artist );
router.get('/image/artist/:Artist', checkAuth, searchController.search_image_by_artist );

router.get('/audio/title/:Title', checkAuth, searchController.search_audio_by_title );
router.get('/video/title/:Title', checkAuth, searchController.search_video_by_title );
router.get('/image/title/:Title', checkAuth, searchController.search_image_by_title );

router.get('/audio/?', checkAuth, searchController.search_audio );
router.get('/video/?', checkAuth, searchController.search_video );
router.get('/image/?', checkAuth, searchController.search_image );

module.exports = router;
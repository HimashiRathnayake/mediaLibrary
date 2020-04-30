const express =require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const favoritesController = require('../controllers/favorites');

router.post('/add/:type/:Id', checkAuth, favoritesController.addFavorites);
router.delete('/remove/:type/:Id', checkAuth, favoritesController.removeFavorites);
router.get('/:type', checkAuth, favoritesController.favourites_get_all);
router.get('/:type/:Id', checkAuth, favoritesController.favourites_get_is_favorite);

module.exports = router;

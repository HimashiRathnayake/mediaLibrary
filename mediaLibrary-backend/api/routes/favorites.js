const express =require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const favoritesController = require('../controllers/favorites');

router.post('/add/:type/:Id', checkAuth, favoritesController.addFavorites);
router.delete('/remove/:Id', checkAuth, favoritesController.removeFavorites);
router.get('/', checkAuth, favoritesController.favourites_get_all);

module.exports = router;

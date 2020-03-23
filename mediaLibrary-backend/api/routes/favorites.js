const express =require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const favoritesController = require('../controllers/favorites');

router.post('/add', checkAuth, favoritesController.addFavorites);
router.delete('/remove', checkAuth, favoritesController.removeFavorites);

module.exports = router;
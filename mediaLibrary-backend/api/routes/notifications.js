const express =require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const notificationsController = require('../controllers/notification');

router.get('/', checkAuth, notificationsController.notifications_get_all);

module.exports = router;

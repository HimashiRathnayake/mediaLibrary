const express=require('express');
const router=express.Router();

const UserController = require('../controllers/user');
const checkAuth=require('../middleware/check-auth');

router.post('/signup', UserController.user_signup);
router.get('/:email', checkAuth, UserController.get_other_users);
router.post('/login', UserController.user_login);
router.delete('/:userId', UserController.user_delete);

module.exports = router;
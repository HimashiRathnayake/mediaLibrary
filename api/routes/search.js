const express =require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const File =  require('../models/metaData');

const searchController = require('../controllers/search');

router.get('/', checkAuth, searchController.search_get_all);

router.post('/', checkAuth, searchController.create_files);

router.get('/:Id', checkAuth, searchController.get_a_file );

router.patch('/:Id', (req, res, next) => {
        res.status(200).json({
            message: 'You update the special id'
        });
});

router.delete('/:Id', (req, res, next) => {
    res.status(200).json({
        message: 'You delete the special id'
    });
});

module.exports = router;
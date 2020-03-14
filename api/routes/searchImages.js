const express =require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling get request to /searchImages'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling post request to /searchImages'
    });
});

router.get('/:imageId', (req, res, next) => {
    res.status(200).json({
        message: 'get Image corresponding to the id ',
        imageId: req.params.imageId
    });  
});

router.delete('/:imageId', (req, res, next) => {
    res.status(200).json({
        message: 'delete Image corresponding to the id ',
        imageId: req.params.imageId
    });  
});

module.exports = router;
const express =require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling get request to /searchVideos'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling post request to /searchVideos'
    });
});

router.get('/:videoId', (req, res, next) => {
    res.status(200).json({
        message: 'get Video corresponding to the id ',
        videoId: req.params.videoId
    });  
});

router.delete('/:videoId', (req, res, next) => {
    res.status(200).json({
        message: 'delete Video corresponding to the id ',
        videoId: req.params.videoId
    });  
});

module.exports = router;
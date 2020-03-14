const express =require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling get request to /searchAudios'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling post request to /searchAudios'
    });
});

router.get('/:audioId', (req, res, next) => {
    res.status(200).json({
        message: 'get Audio corresponding to the id ',
        audioId: req.params.audioId
    });  
});

router.delete('/:audioId', (req, res, next) => {
    res.status(200).json({
        message: 'delete Audio corresponding to the id ',
        audioId: req.params.audioId
    });  
});

module.exports = router;
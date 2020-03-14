const express =require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling get request to /search'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling post request to /search'
    });
});

router.get('/:Id', (req, res, next) => {
    const id = req.params.Id;
    if(id === 'special'){
        res.status(200).json({
            message: 'You discover the special id',
            id: id
        });
    }else{
        res.status(200).json({
            message: 'you passed an Id'
        });
    }
    
});

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
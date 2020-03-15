const express =require('express');
const router = express.Router();
const mongoose = require('mongoose');

const File =  require('../models/metaData');

router.get('/', (req, res, next) => {
    /* res.status(200).json({
        message: 'Handling get request to /search'
    }); */

    File.find() 
    .exec()
    .then(docs => {
        console.log(docs); 
        // if (docs.length >=0){
            res.status(200).json(docs); 
        /* }else{
            res.status(404).json({
                message: 'No entries found'
            }); 
        } */
             
    }) 
    .catch(err => {
        console.log(err); 
        res.status(500).json({error: err});
    });
});

router.post('/', (req, res, next) => {
    const file = new File({
        _id: new mongoose.Types.ObjectId(),
        fileName: req.body.fileName
        /* uniqueName: req.body.uniqueName,
        fileType: req.body.fileType,
        fileSize: req.body.fileSize,
        date: req.body.date,
        accessList: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        server: req.body.server */
    });
    file
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling post request to /search',
            createFile: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
           error: err
        });
    });
});

router.get('/:Id', (req, res, next) => {
    const id = req.params.Id;
    File.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc){ 
            res.status(200).json(doc);
        }else{
            res.status(404).json({
                message: 'No valid entry found for provided ID'
            });
        }
        
    }) 
    .catch(err => {
        console.log(err); 
        res.status(500).json({error: err});
    });
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
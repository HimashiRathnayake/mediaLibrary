const mongoose = require('mongoose');
const File =  require('../models/metaData');

exports.search_get_all =  (req, res, next) => {
    File.find() 
    .select(' fileName _id')
    .exec()
    .then(docs => { 
        const response = {
           count: docs.length,
           files:  docs.map(doc => {
               return {
                   fileName: doc.fileName,
                   _id: doc._id,
                   url: {
                       request: {
                           type: 'GET',
                           url: 'http://localhost:3000/search/' + doc._id
                       }
                   }
               }
           })
        };
        // if (docs.length >=0){
            res.status(200).json(response); 
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
}

exports.create_files =  (req, res, next) => {
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
}

exports.get_a_file =  (req, res, next) => {
    const id = req.params.Id;
    File.findById(id)
    .select('fileName _id')
    .exec()
    .then(doc => {
        console.log("from database", doc);
        if (doc){ 
            res.status(200).json({
                file: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/search/' + doc._id
                }
            });
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
}
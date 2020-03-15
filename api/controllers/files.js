const mongoose = require('mongoose');
const mm = require('music-metadata');
const util = require('util');
const File =  require('../models/metaData'); 
const ffmpeg =require('ffmpeg'); 
const ffmetadata = require("ffmetadata");

exports.files_get_metadata = (req,res,next) =>{
     
// Read song.mp3 metadata
ffmetadata.read("uploads/Daasa Themila-Iraj _ Infaas & Devashrie-www.hirufm.lk.mp3", function(err, data) {
    if (err) console.error("Error reading metadata", err);
    else console.log(data);
});
//     mm.parseFile('uploads/Daasa Themila-Iraj _ Infaas & Devashrie-www.hirufm.lk.mp3')
//   .then( metadata => {
//     console.log(util.inspect(metadata, { showHidden: false, depth: null }));
//   })
//   .catch( err => {
//     console.error(err.message);
//   });
}

exports.files_upload_file = (req, res, next) =>{
    console.log(req.file);
    const newFile =new File({
        _id: new mongoose.Types.ObjectId(),
        fileName: req.file.originalname,
        path: req.file.path,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        date: new Date(),
        accessList: [req.userData.userId],
        server: 'http://localhost:3000/'
    });
    newFile.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'File uploaded successfully',
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.files_get_file = (req, res, next) => {
    const id = req.params.fileId;
    File.findById(id)
    // .select('path ')
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc){
            res.status(200).json({
                product: doc,
            });
        }else{
            res.status(404).json({message: 'No valid entry founded for provided ID'});
        }
    }).
    catch(err => {
        console.log(err);  
        res.status(500).json({error: err});
    }
    );
}
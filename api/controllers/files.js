const mongoose = require('mongoose');
const File =  require('../models/metaData'); 

exports.files_upload_file = (req, res, next) =>{
    console.log(req.file);
    const newFile =new File({
        _id: new mongoose.Types.ObjectId(),
        fileName: req.file.originalname,
        uniqueName: req.file.filename,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        date: new Date(),
        accessList: [],
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
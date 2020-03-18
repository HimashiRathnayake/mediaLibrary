const mongoose = require('mongoose');

const Image =  require('../models/image'); 

exports.images_get_all = (req, res, next) =>{
    Image.find({accessList: req.userData.userId})
    .exec()
    .then(docs=>{
        const response={
            count: docs.length,
            Images: docs.map(doc=>{
                return{
                    _id: doc._id,
                    imageName: doc.imageName,
                    title: doc.title,
                    // album: doc.album,
                    // artist: doc.artist,
                    date: doc.date,
                    accessList: doc.accessList,
                    folder: doc.folder,
                    path: doc.path
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
}

exports.images_get_images_from_folder = (req, res, next) =>{
    Image.find({folder: req.params.folderId})
    .exec()
    .then(docs=>{
        const response={
            count: docs.length,
            images: docs.map(doc=>{
                return{
                    _id: doc._id,
                    imageName: doc.imageName,
                    title: doc.title,
                    // album: doc.album,
                    // artist: doc.artist,
                    date: doc.date,
                    accessList: doc.accessList,
                    folder: doc.folder,
                    path: doc.path
                }
            })
        };
        res.status(200).json(response);
    }).
    catch(err => {
        console.log(err);  
        res.status(500).json({error: err});
    }
    );
}

exports.images_upload_image = (req, res, next) =>{
    const image =new Image({
        _id: new mongoose.Types.ObjectId(),
        imageName: req.file.originalname,
        title: req.title,
        // album: req.album,
        // artist: req.artist,
        date: req.date,
        accessList: [req.userData.userId],
        folder: req.params.folderId,
        path: req.file.path
    });
    image.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Image uploaded successfully',
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.images_rename_image = (req, res, next) =>{
    Image.update({_id: req.params.imageId},{imageName: req.body.imageName})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Image renamed successfully'
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

exports.images_delete_image = (req, res, next) => {
    Image.remove({_id: req.params.imageId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Image deleted"
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

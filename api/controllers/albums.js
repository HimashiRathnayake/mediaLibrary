const mongoose = require('mongoose');

const Album =  require('../models/album'); 

exports.albums_create_new_album = (req, res, next) =>{
    const album =new Album({
        _id: new mongoose.Types.ObjectId(),
        albumName: req.file.originalname,
        userList: [req.userData.userId],
        fileList: []
    });
    album.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Album created successfully',
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.albums_get_user_albums= (req, res, next) => {
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
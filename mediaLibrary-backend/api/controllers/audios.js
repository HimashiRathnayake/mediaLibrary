const mongoose = require('mongoose');

const Audio =  require('../models/audio'); 

exports.audios_get_all = (req, res, next) =>{
    Audio.find({accessList: req.userData.userId})
    .exec()
    .then(docs=>{
        const response={
            count: docs.length,
            Audios: docs.map(doc=>{
                return{
                    _id: doc._id,
                    audioName: doc.audioName,
                    title: doc.title,
                    album: doc.album,
                    artist: doc.artist,
                    year: doc.year,
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

exports.audios_get_audios_from_folder = (req, res, next) =>{
    Audio.find({folder: req.params.folderId})
    .exec()
    .then(docs=>{
        const response={
            count: docs.length,
            audios: docs.map(doc=>{
                return{
                    _id: doc._id,
                    audioName: doc.audioName,
                    title: doc.title,
                    album: doc.album,
                    artist: doc.artist,
                    year: doc.year,
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

exports.audios_upload_audio = (req, res, next) =>{
    const audio =new Audio({
        _id: new mongoose.Types.ObjectId(),
        audioName: req.file.originalname,
        title: req.data.Title,
        album: req.data.Album,
        artist: req.data.Artist,
        year: req.data.Year,
        accessList: [req.userData.userId],
        folder: req.params.folderId,
        path: process.env.SERVER+req.file.filename
    });
    audio.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Audio uploaded successfully',
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.audios_rename_audio = (req, res, next) =>{
    Audio.update({_id: req.params.audioId},{audioName: req.body.audioName})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Audio renamed successfully'
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

exports.audios_delete_audio = (req, res, next) => {
    Audio.remove({_id: req.params.audioId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Audio deleted"
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}
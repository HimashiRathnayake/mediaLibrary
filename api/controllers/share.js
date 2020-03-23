const mongoose = require('mongoose');

const Image =  require('../models/image'); 
const Audio =  require('../models/audio'); 
const Video =  require('../models/video'); 
const Folder =  require('../models/folder'); 

exports.image_add_user = (req, res, next) =>{
    Image.update({_id: req.params.imageId},{$push: { accessList: req.body.userId}})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Image shared successfully'
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.audio_add_user = (req, res, next) =>{
    Audio.update({_id: req.params.audioId},{$push: { accessList: req.body.userId}})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Audio shared successfully'
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.video_add_user = (req, res, next) =>{
    Video.update({_id: req.params.videoId},{$push: { accessList: req.body.userId}})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Video shared successfully'
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.folder_add_user = (req, res, next) =>{
    Folder.update({_id: req.params.folderId},{$push: { userList: req.body.userId}})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Folder shared successfully'
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.user_get_shared_images = (req, res, next) => {
    Image.find({ accessList: req.userData.userId, 'accessList.1' : {$exists: true }})
    .exec()
    .then(docs=>{
        res.status(200).json(docs);
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
};

exports.user_get_shared_audios = (req, res, next) => {
    Audio.find({ accessList: req.userData.userId, 'accessList.1' : {$exists: true }})
    .exec()
    .then(docs=>{
        res.status(200).json(docs);
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
};

exports.user_get_shared_videos = (req, res, next) => {
    Video.find({ accessList: req.userData.userId, 'accessList.1' : {$exists: true }})
    .exec()
    .then(docs=>{
        res.status(200).json(docs);
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
};

exports.user_get_shared_folders = (req, res, next) => {
    Folder.find({ userList: req.userData.userId, 'userList.1' : {$exists: true }})
    .exec()
    .then(docs=>{
        res.status(200).json(docs);
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
};





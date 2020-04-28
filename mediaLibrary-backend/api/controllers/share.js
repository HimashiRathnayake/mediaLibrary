const mongoose = require('mongoose');

const Image =  require('../models/image'); 
const Audio =  require('../models/audio'); 
const Video =  require('../models/video'); 
const Folder =  require('../models/folder'); 

exports.image_add_user = (req, res, next) =>{
    Image.find({_id: req.params.imageId, accessList: {$in:[req.params.userId]}})
    .exec()
    .then(result => {
        if (result.length===0){
            Image.updateOne({_id: req.params.imageId},{$push: { accessList: req.params.userId}})
            .exec()
            .then(()=>{
                res.status(200).json({
                    message: 'Image shared successfully'
                });
            })
        }else{
            res.status(409).json({
                message: 'Already Shared'
            });
        }        
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.audio_add_user = (req, res, next) =>{
    Audio.find({_id: req.params.audioId, accessList: {$in:[req.params.userId]}})
    .exec()
    .then(result => {
        if (result.length===0){
            Audio.updateOne({_id: req.params.audioId},{$push: { accessList: req.params.userId}})
            .exec()
            .then(()=>{
                res.status(200).json({
                    message: 'Audio shared successfully'
                });
            })
        }else{
            res.status(409).json({
                message: 'Already Shared'
            });
        }      
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.video_add_user = (req, res, next) =>{
    Video.find({_id: req.params.videoId, accessList: {$in:[req.body.userId]}})
    .exec()
    .then(result => {
        if (result.length===0){
            Video.updateOne({_id: req.params.videoId},{$push: { accessList: req.body.userId}})
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: 'Video shared successfully'
                });
            })
        }else{
            res.status(409).json({
                message: 'Already Shared'
            });
        }      
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.folder_add_user = (req, res, next) =>{
    Folder.find({_id: req.params.folderId, userList: {$in:[req.params.userId]}})
    .exec()
    .then(result => {
        if (result.length===0){
            Folder.updateOne({_id: req.params.folderId},{$push: { userList: req.params.userId}})
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Folder shared successfully'
                });
            })
        }else{
            res.status(409).json({
                message: 'Already Shared'
            });
        }      
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
    .populate('accessList')
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
    .populate('accessList')
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
    .populate('accessList')
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
    .populate('userList')
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

exports.image_remove_user = (req, res, next) =>{
    Image.updateOne({_id: req.params.imageId},{$pull: { accessList: req.params.userId}})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Removed user successfully'
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

exports.audio_remove_user = (req, res, next) =>{
    Audio.updateOne({_id: req.params.audioId},{$pull: { accessList: req.params.userId}})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Removed user successfully'
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

exports.video_remove_user = (req, res, next) =>{
    Video.updateOne({_id: req.params.videoId},{$pull: { accessList: req.params.userId}})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Removed user successfully'
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

exports.folder_remove_user = (req, res, next) =>{
    Folder.updateOne({_id: req.params.folderId},{$pull: { userList: req.params.userId}})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Removed user successfully'
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

const mongoose = require('mongoose');
const fs = require('fs');

const Video =  require('../models/video'); 

exports.videos_get_all = (req, res, next) =>{
    Video.find({accessList: req.userData.userId})
    .exec()
    .then(docs=>{
        const response={
            count: docs.length,
            Videos: docs.map(doc=>{
                return{
                    _id: doc._id,
                    videoName: doc.videoName,
                    title: doc.title,
                    artist: doc.artist,
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

exports.videos_get_videos_from_folder = (req, res, next) =>{
    Video.find({folder: req.params.folderId})
    .exec()
    .then(docs=>{
        const response={
            count: docs.length,
            videos: docs.map(doc=>{
                return{
                    _id: doc._id,
                    videoName: doc.videoName,
                    title: doc.title,
                    artist: doc.artist,
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

exports.videos_upload_video = (req, res, next) =>{
    const video =new Video({
        _id: new mongoose.Types.ObjectId(),
        videoName: req.file.originalname,
        title: req.data.Title,
        artist: req.data.Artist,
        accessList: [req.userData.userId],
        folder: req.params.folderId,
        path: process.env.SERVER+req.file.filename
    });
    video.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Video uploaded successfully',
            video: result
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.videos_rename_video = (req, res, next) =>{
    Video.findOne({_id: req.params.videoId})
    .then(result=>{
        if (result===null){
            res.status(404).json({
                message: 'Video not found'
            })
        }else if (req.body.videoName===undefined){
            res.status(409).json({
                message: 'Video name is required'
            });
        }else{
            Video.updateOne({_id: req.params.videoId},{videoName: req.body.videoName})
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Video renamed successfully'
                });
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

exports.videos_delete_video = (req, res, next) => {
    Video.findOne({_id: req.params.videoId})
    .then(result=>{
        if (result===null){
            res.status(404).json({
                message: 'Video not found'
            })
        }
        else{
            var videoPath = result.path.split('/');
            fs.unlinkSync('uploads/'+videoPath[videoPath.length-1]);
            Video.deleteOne({_id: req.params.videoId})
            .exec()
            .then(result => {
                res.status(200).json({
                    message: "Video deleted"
                });
            })
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

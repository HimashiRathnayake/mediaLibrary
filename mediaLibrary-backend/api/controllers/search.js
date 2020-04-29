var url = require('url');
const querystring = require('querystring');

const mongoose = require('mongoose');
const Audio =  require('../models/audio');
const Video = require('../models/video');
const Image = require('../models/image');

//search by artist name

exports.search_audio_by_artist =  (req, res, next) => {
    const artist = new RegExp(req.params.Artist, 'i');
    const accessList = req.userData.userId;
    Audio.find({artist: artist , accessList: accessList  })
    .populate('accessList')
    .populate('folder')
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


exports.search_video_by_artist =  (req, res, next) => {
    const artist = new RegExp(req.params.Artist, 'i');
    const accessList = req.userData.userId;
    Video.find({artist: artist, accessList: accessList })
    .populate('accessList')
    .populate('folder')
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



exports.search_image_by_artist =  (req, res, next) => {
    const artist = new RegExp(req.params.Artist, 'i');
    const accessList = req.userData.userId;
    Image.find({artist: artist, accessList: accessList })
    .populate('accessList')
    .populate('folder')
    .exec()
    .then(docs=>{
        const response={
            count: docs.length,
            Images: docs.map(doc=>{
                return{
                    _id: doc._id,
                    imageName: doc.imageName,
                    title: doc.title,
                    subject: doc.subject,
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

//search by title

exports.search_audio_by_title =  (req, res, next) => {
    const title = new RegExp(req.params.Title, 'i');
    const accessList = req.userData.userId;
    Audio.find({title: title, accessList: accessList })
    .populate('accessList')
    .populate('folder')
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


exports.search_video_by_title =  (req, res, next) => {
    const title = new RegExp(req.params.Title, 'i');
    const accessList = req.userData.userId;
    Video.find({title: title, accessList: accessList })
    .populate('accessList')
    .populate('folder')
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



exports.search_image_by_title =  (req, res, next) => {
    const title = new RegExp(req.params.Title, 'i');
    const accessList = req.userData.userId;
    Image.find({title: title, accessList: accessList })
    .populate('accessList')
    .populate('folder')
    .exec()
    .then(docs=>{
        const response={
            count: docs.length,
            Images: docs.map(doc=>{
                return{
                    _id: doc._id,
                    imageName: doc.imageName,
                    title: doc.title,
                    subject: doc.subject,
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

//search audio

exports.search_audio =  (req, res, next) => {
    const accessList = req.userData.userId;

    if(req.url.split('?')[1].length){
        let parsedUrl = url.parse(req.url+('&'+"accessList="+accessList)); 
        let parsedQs = querystring.parse(parsedUrl.query);
    
        Audio.find(parsedQs)
        .populate('accessList')
        .populate('folder')
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
    else{
        res.status(409).json({
            message: 'Didn`t pass any value'
        });
    }
    
}

//search video

exports.search_video =  (req, res, next) => {
    const accessList = req.userData.userId;
    if(req.url.split('?')[1].length){
        let parsedUrl = url.parse(req.url+('&'+"accessList="+accessList)); 
        let parsedQs = querystring.parse(parsedUrl.query);

        Video.find(parsedQs)
        .populate('accessList')
        .populate('folder')
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
    else{
        res.status(409).json({
            message: 'Didn`t pass any value'
        });
    }
    
}


//search images

exports.search_image =  (req, res, next) => {
    const accessList = req.userData.userId;
    //console.log("req.url:",req.url.split('?')[1].length);
    if(req.url.split('?')[1].length){
        let parsedUrl = url.parse(req.url+('&'+"accessList="+accessList)); 
        let parsedQs = querystring.parse(parsedUrl.query);

        Image.find( parsedQs)
        .populate('accessList')
        .populate('folder')
        .exec()
        .then(docs=>{
            const response={
                count: docs.length,
                Images: docs.map(doc=>{
                    return{
                        _id: doc._id,
                        imageName: doc.imageName,
                        title: doc.title,
                        subject: doc.subject,
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
    else{
        res.status(409).json({
            message: 'Didn`t pass any value'
        });
    }
    
    
    
}

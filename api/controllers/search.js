var url = require('url');
const querystring = require('querystring');

const mongoose = require('mongoose');
//const File = require('../models/metaData');
const Audio =  require('../models/audio');
const Video = require('../models/video');
const Image = require('../models/image');

/* exports.get_a_file =  (req, res, next) => {
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

exports.get_files =  (req, res, next) => {
    //const id = req.params.Id;
    File.find()
    .select('fileName _id')
    .exec()
    .then(doc => {
        console.log("from database", doc);
        if (doc){ 
            res.status(200).json({
                file: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/search' + doc._id
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
 */
//create new files

/* exports.create_new_audio =  (req, res, next) => {
    const audio = new Audio({
        _id: new mongoose.Types.ObjectId(),
        audioName: req.body.audioName,
        title: req.body.title,
        album: req.body.album,
        artist: req.body.artist,
        year: req.body.year,
        //accessList: [req.userData.userId],
       folder: req.body.folder,
        path: req.body.path,
    });
    audio
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Audio created',
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

exports.create_new_video =  (req, res, next) => {
    const video = new Video({
        _id: new mongoose.Types.ObjectId(),
        videoName: req.body.videoName,
        title: req.body.title,
        artist: req.body.artist,
        //accessList: [req.userData.userId],
        folder: req.body.folder,
        path: req.body.path,
    });
    video
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Video created',
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

exports.create_new_Image =  (req, res, next) => {
    const image = new Image({
        _id: new mongoose.Types.ObjectId(),
        imageName: req.body.imageName,
        title: req.body.title,
        subject: req.body.subject,
        artist: req.body.artist,
        //accessList: [req.userData.userId],
        folder: req.body.folder,
        path: req.body.path,
    });
    image
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Image created',
            createFile: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
           error: err
        });
    });
}  */

//search by artist name

exports.search_audio_by_artist =  (req, res, next) => {
    const artist = req.params.Artist;
    const accessList = req.usrData.userId;
    Audio.find({artist: artist, accessList: accessList })
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


exports.search_video_by_artist =  (req, res, next) => {
    const artist = req.params.Artist;
    const accessList = req.usrData.userId;
    Video.find({artist: artist, accessList: accessList })
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



exports.search_image_by_artist =  (req, res, next) => {
    const artist = req.params.Artist;
    const accessList = req.usrData.userId;
    Image.find({artist: artist, accessList: accessList })
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
    const title = req.params.Title;
    const accessList = req.usrData.userId;
    Audio.find({title: title, accessList: accessList })
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


exports.search_video_by_title =  (req, res, next) => {
    const title = req.params.Title;
    const accessList = req.usrData.userId;
    Video.find({title: title, accessList: accessList })
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



exports.search_image_by_title =  (req, res, next) => {
    const title = req.params.Title;
    const accessList = req.usrData.userId;
    Image.find({title: title, accessList: accessList })
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
    let parsedUrl = url.parse(req.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    Audio.find(parsedQs)
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

//search video

exports.search_video =  (req, res, next) => {
    let parsedUrl = url.parse(req.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    Video.find(parsedQs)
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


//search images

exports.search_image =  (req, res, next) => {
    let parsedUrl = url.parse(req.url); 
    let parsedQs = querystring.parse(parsedUrl.query);
    
    Image.find( parsedQs)
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

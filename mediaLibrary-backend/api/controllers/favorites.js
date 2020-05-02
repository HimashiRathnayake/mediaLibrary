const mongoose = require('mongoose');
const User =  require('../models/user');
const Image =  require('../models/image');
const Audio =  require('../models/audio');
const Video =  require('../models/video');

exports.addFavorites =  (req, res, next) => {
    const id= req.userData.userId;
    const type= req.params.type;
    const fileId= req.params.Id;
    
    if (type=== 'Image'){
        Image.findOne({_id: fileId})
        .then(result=>{
            if (result===null){
                res.status(404).json({
                    message: 'Image not found'
                })
            }
            else{
                User.findOne({_id: id})
                .populate('imgfavourites')
                .exec()
                .then(function(user){
                    const isInFavourite= user.imgfavourites.some(function(favourite){
                        return (favourite._id.equals(mongoose.Types.ObjectId(fileId)));
                    });

                    if(isInFavourite){
                        res.status(201).json({
                            message: 'Already in favorites',
                            imgfavourites: user.imgfavourites
                        });
                    }
                    else{
                        user.imgfavourites.push(fileId);
                        user
                        .save()
                        .then(result => {
                            console.log(result);
                            res.status(200).json({
                                message: 'Add image to favourites',
                                imgfavourites: result.imgfavourites
                            })
                        });
                    }
                });
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        }); 
    }
    else if (type=== 'Audio'){
        Audio.findOne({_id: fileId})
        .then(result=>{
            console.log('results:', result);
            if (result===null){
                res.status(404).json({
                    message: 'Audio not found'
                })
            }
            else{
                User.findOne({_id: id})
                .populate('audfavourites')
                .exec()
                .then(function(user){
                    const isInFavourite= user.audfavourites.some(function(favourite){
                        return (favourite._id.equals(mongoose.Types.ObjectId(fileId)));
                    });

                    if(isInFavourite){
                        res.status(201).json({
                            message: 'Already in favorites',
                            audfavourites: user.audfavourites
                        });
                    }
                    else{
                        user.audfavourites.push(fileId)
                        user
                        .save()
                        .then(result => {
                            res.status(200).json({
                                message: 'Add audio to favourites',
                                audfavourites: result.audfavourites
                            })
                        }); 
                    }
                });
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        }); 
    }else{
        Video.findOne({_id: fileId})
        .then(result=>{
            console.log('results:', result);
            if (result===null){
                res.status(404).json({
                    message: 'Video not found'
                })
            }
            else{
                User.findOne({_id: id})
                .populate('vidfavourites')
                .exec()
                .then(function(user){
                    const isInFavourite= user.vidfavourites.some(function(favourite){
                        return (favourite._id.equals(mongoose.Types.ObjectId(fileId)));
                    });

                    if(isInFavourite){
                        res.status(201).json({
                            message: 'Already in favorites',
                            vidfavourites: user.vidfavourites
                        });
                    }
                    else{
                        user.vidfavourites.push(fileId)
                        user
                        .save()
                        .then(result => {
                            res.status(200).json({
                                message: 'Add video to favourites',
                                vidfavourites: result.vidfavourites
                            })
                        }); 
                    }
                });
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        }); 
    }
}

exports.removeFavorites =  (req, res, next) => {
    const id= req.userData.userId;
    const type= req.params.type;
    const fileId= req.params.Id;

    if (type=== 'Image'){
        Image.findOne({_id: fileId})
        .then(result=>{
            if (result===null){
                res.status(404).json({
                    message: 'Image not found'
                })
            }
            else{
                User.findOne({_id: id})
                .populate('imgfavourites')
                .exec()
                .then(function(user){
                    const isInFavourite= user.imgfavourites.some(function(favourite){
                        return (favourite._id.equals(mongoose.Types.ObjectId(fileId)));
                    });

                    if(isInFavourite){
                        user.imgfavourites.remove(fileId);
                        user
                        .save()
                        .then(result => {
                            console.log(result);
                            res.status(200).json({
                                message: 'Remove image from favorites',
                                imgfavourites: result.imgfavourites
                            });
                        });
                    }
                    else{
                        res.status(201).json({
                            message: 'Image not in favorites',
                            imgfavourites: user.imgfavourites
                        });
                    }
                });
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        }); 
    }
    else if (type=== 'Audio'){
        Audio.findOne({_id: fileId})
        .then(result=>{
            if (result===null){
                res.status(404).json({
                    message: 'Audio not found'
                })
            }
            else{
                User.findOne({_id: id})
                .populate('audfavourites')
                .exec()
                .then(function(user){
                    const isInFavourite= user.audfavourites.some(function(favourite){
                        return (favourite._id.equals(mongoose.Types.ObjectId(fileId)));
                    });

                    if(isInFavourite){
                        user.audfavourites.remove(fileId);
                        user
                        .save()
                        .then(result => {
                            console.log(result);
                            res.status(200).json({
                                message: 'Remove audio from favorites',
                                audfavourites: result.audfavourites
                            });
                        });
                    }
                    else{
                        res.status(201).json({
                            message: 'Audio not in favorites',
                            audfavourites: user.audfavourites
                        });
                    }
                });
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        }); 
    }
    else{
        Video.findOne({_id: fileId})
        .then(result=>{
            if (result===null){
                res.status(404).json({
                    message: 'Video not found'
                })
            }
            else{
                User.findOne({_id: id})
                .populate('vidfavourites')
                .exec()
                .then(function(user){
                    const isInFavourite= user.vidfavourites.some(function(favourite){
                        return (favourite._id.equals(mongoose.Types.ObjectId(fileId)));
                    });

                    if(isInFavourite){
                        user.vidfavourites.remove(fileId);
                        user
                        .save()
                        .then(result => {
                            console.log(result);
                            res.status(200).json({
                                message: 'Remove video from favorites',
                                vidfavourites: result.vidfavourites
                            });
                        });
                    }
                    else{
                        res.status(201).json({
                            message: 'Video not in favorites',
                            vidfavourites: user.vidfavourites
                        });
                    }
                });
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        }); 
    }
    
}

exports.favourites_get_all = (req, res, next) =>{
    const id= req.userData.userId;
    const type= req.params.type;

    if(type ==='Image'){
        User.findById(id)
        .populate({
            path    : 'imgfavourites',
            populate: 'folder accessList'
        })
        .exec()
        .then(user => {
            res.status(200).json({
                imgfavourites: user.imgfavourites
            });
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            });
        });
    }
    else if(type ==='Audio'){
        User.findById(id)
        .populate({
            path    : 'audfavourites',
            populate: 'folder accessList'
        })
        .exec()
        .then(user => {
            res.status(200).json({
                audfavourites: user.audfavourites
            });
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            });
        });
    }
    else{
        User.findById(id)
        .populate({
            path    : 'vidfavourites',
            populate: 'folder accessList'
        })
        .exec()
        .then(user => {
            res.status(200).json({
                vidfavourites: user.vidfavourites
            });
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            });
        });
    }
    
}


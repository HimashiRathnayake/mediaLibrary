const mongoose = require('mongoose');
const User =  require('../models/user');

exports.addFavorites =  (req, res, next) => {
    const id= req.userData.userId;
    const fileId= req.body.fileId;

    User.findById(id)
    .then(function(user){
        console.log("user:", user);
        if(!user)
        {
            return res.sendStatus(401);
        } 
                
        const isInFavourite= user.favourites.some(function(favourite){
            return (favourite._id.equals(mongoose.Types.ObjectId(fileId)));
        });
        
        if(isInFavourite){
            res.status(400).json({
                message: 'already have  favorites',
                file: user
            });
        }
        else{
            user.favourites.push(fileId);
            user
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'add favorites',
                    createFile: result
                });
            });
        }   
    }).catch(next);  
}

exports.removeFavorites =  (req, res, next) => {
    const id= req.userData.userId;
    const fileId= req.body.fileId;
    
    User.findById(id)
    .then(function(user){
        console.log("user:", user);
        if(!user)
        {
            return res.sendStatus(401);
        } 
        
        const isInFavourite= user.favourites.some(function(favourite){
            return (favourite._id.equals(mongoose.Types.ObjectId(fileId)));
        });
        
        if(isInFavourite){
            user.favourites.remove(fileId);
            user
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'remove favorites',
                    createFile: result
                });
            });
        }
        else{
            res.status(201).json({
                message: 'not in favorites',
                createFile: user
            });
        }  
    }).catch(next);  

}


const mongoose = require('mongoose');
const User =  require('../models/user');

exports.addFavorites =  (req, res, next) => {
    const id= req.userData.userId;
    const type= req.params.type;
    const fileId= req.params.Id;

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
                favourites: user.favourites
            });
        }
        else{
            const file = {_id: fileId, type: type, addedDate: new Date().toLocaleDateString()};
            user.favourites.push(file);
            user
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'add favorites',
                    favourites: result.favourites
                });
            });
        }   
    }).catch(next);  
}

exports.removeFavorites =  (req, res, next) => {
    const id= req.userData.userId;
    const fileId= req.params.Id;
    
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
                    favourites: result.favourites
                });
            });
        }
        else{
            res.status(201).json({
                message: 'not in favorites',
                favourites: user.favourites
            });
        }  
    }).catch(next);  

}

exports.favourites_get_all = (req, res, next) =>{
    const id= req.userData.userId;
    User.findById(id)
    .exec()
    .then(user => {
        res.status(200).json({
            favourites: user.favourites
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
}


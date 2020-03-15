const mongoose = require('mongoose');

const Album =  require('../models/album'); 

exports.albums_create_new_album = (req, res, next) =>{
    const album =new Album({
        _id: new mongoose.Types.ObjectId(),
        albumName: req.body.albumName,
        userList: [req.userData.userId],
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
    const userId = req.userData.userId;
    Album.find({userList: userId})
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc){
            res.status(200).json({
                albums: doc
            });
        }else{
            res.status(404).json({message: 'No albums'});
        }
    }).
    catch(err => {
        console.log(err);  
        res.status(500).json({error: err});
    }
    );
}

// exports.albums_rename_album = (req, res, next) =>{
//     const id=req.params.albumId;
//     const updateOps={};
//     for (const ops of req.body){
//         updateOps[ops.propName] = ops.value;
//     }
//     Album.update({_id: id},{$set: updateOps})
//     .exec()
//     .then(result => {
//         console.log(result);
//         res.status(200).json({
//             message: 'Album renamed successfully'
//         });
//     })
//     .catch(err=>{
//         console.log(err);
//         res.status(500).json({
//             error:err
//         });
//     });
// }

exports.albums_get_user_albums= (req, res, next) => {
    const userId = req.userData.userId;
    Album.find({userList: userId})
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc){
            res.status(200).json({
                albums: doc
            });
        }else{
            res.status(404).json({message: 'No albums'});
        }
    }).
    catch(err => {
        console.log(err);  
        res.status(500).json({error: err});
    }
    );
}
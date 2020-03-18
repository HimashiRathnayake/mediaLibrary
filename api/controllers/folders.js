const mongoose = require('mongoose');

const Folder =  require('../models/folder'); 

exports.folders_get_folders = (req, res, next) =>{
    Folder.find({userList: req.userData.userId, folderType: req.params.type})
    .exec()
    .then(docs=>{
        const response={
            count: docs.length,
            folders: docs.map(doc=>{
                return{
                    _id: doc._id,
                    folderName: doc.folderName,
                    userList: doc.userList,
                    folderType: doc.folderType
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

exports.folders_create_folder = (req, res, next) =>{
    const folder =new Folder({
        _id: new mongoose.Types.ObjectId(),
        folderName: req.body.folderName,
        userList: [req.userData.userId],
        folderType: req.params.type
    });
    folder.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Folder created successfully',
        });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.folders_rename_folder = (req, res, next) =>{
    Folder.update({_id: req.params.folderId},{folderName: req.body.folderName})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Folder renamed successfully'
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

exports.folders_delete_folder = (req, res, next) =>{
    Folder.deleteOne({_id: req.params.folderId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Folder deleted"
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}



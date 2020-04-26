const mongoose = require('mongoose');

const Folder =  require('../models/folder'); 
let File;
const folderType= ['Image', 'Audio', 'Video'];

exports.folders_get_folders = (req, res, next) =>{
    if(folderType.includes(req.params.type)){
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
    else{
        res.status(409).json({
            message: 'folderType is invalid'
        });
    }
    
}

exports.folders_create_folder = (req, res, next) =>{
    if(folderType.includes(req.params.type)){
        const folder =new Folder({
            _id: new mongoose.Types.ObjectId(),
            folderName: req.body.folderName,
            userList: [req.userData.userId],
            folderType: req.params.type
        });
        folder
        .save()
        .then(result => {
            //console.log(result);
            res.status(201).json({
                message: 'Folder created successfully',
                folder: result
            });
        })
        .catch(err=>{
            //console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }
    else{
        res.status(409).json({
            message: 'FolderType is invalid'
        });
    }
    
    
}

exports.folders_rename_folder = (req, res, next) =>{
    Folder.findOne({_id: req.params.folderId})
    .then(result => {
        if (result === null){
            res.status(404).json({
                message: 'Folder not found'
            })
        }
        else if(req.body.folderName === undefined){
            res.status(409).json({
                message: 'folderName name is required'
            });
        }
        else{
            Folder.updateOne({_id: req.params.folderId},{folderName: req.body.folderName})
            .exec()
            .then(result => {
                //console.log(result);
                res.status(200).json({
                    message: 'Folder renamed successfully'
                });
            })
        }
    })
    .catch(err=>{
        //console.log(err);
        res.status(500).json({
            error:err
        });
    });
}



exports.folders_delete_folder = (req, res, next) =>{
    Folder.findOne({_id: req.params.folderId})
    .then(result => {
        if (result===null){
            res.status(404).json({
                message: 'Folder not found'
            })
        }
        else{
            Folder.find({_id: req.params.folderId})
            .exec()
            .then(result=>{
                if (result[0].folderType==='Image'){
                    File=require('../models/image');
                }
                else if (result[0].folderType==='Audio'){
                    File=require('../models/audio');
                }else{
                    File=require('../models/video');
                }
                //console.log(File);
                File.deleteMany({folder: req.params.folderId}).exec().then((result)=>{
                    //console.log(result)
                })
            })
            .then(
                Folder.deleteOne({_id: req.params.folderId}).exec()
            )
            .then(result => {
                res.status(200).json({
                    message: "Folder deleted"
                });
            })  
        }
    }) 
    .catch(err=>{
        //console.log(err);
        res.status(500).json({
            error: err
        });
    });
}



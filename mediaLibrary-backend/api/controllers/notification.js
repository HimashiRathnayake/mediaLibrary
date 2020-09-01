const mongoose = require('mongoose');
const User =  require('../models/user');
const Notification = require('../models/notification');
const { $where } = require('../models/user');

exports.notifications_get_all = (req, res, next) =>{
    const id= req.userData.userId;

    User.findById(id)
    .populate({
        path    : 'notifications',
        populate: 'image audio video sender'
    })
    .exec()
    .then(user => {
        res.status(200).json({
            notifications: user.notifications.reverse()
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
    
}  

exports.get_unread_count =(req, res, next)=>{
    const id= req.userData.userId;

    function checkUnread(notification){
        return notification.state=='unread'
    }

    User
    .findById(id)
    .populate('notifications')
    .exec()
    .then(user => {
        res.status(200).json({
            count: user.notifications.filter(checkUnread).length
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
}

exports.notifications_read = (req, res, next) =>{
    Notification.findOne({_id: req.params.notificationId})
    .then(result=>{
        if (result===null){
            res.status(404).json({
                message: 'Notification not found'
            })
        }else{
            Notification.updateOne({_id: req.params.notificationId},{state: 'read'})
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'State change successfully'
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

exports.notifications_delete = (req, res, next) =>{
    Notification.remove({_id: req.params.notificationId})
    .exec()
    .then(result=> {
        console.log(result);
        res.status(200).json({
            message: 'Notification deleted'
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

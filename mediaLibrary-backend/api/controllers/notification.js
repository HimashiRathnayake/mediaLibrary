const mongoose = require('mongoose');
const User =  require('../models/user');

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
            notifications: user.notifications
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
    
}


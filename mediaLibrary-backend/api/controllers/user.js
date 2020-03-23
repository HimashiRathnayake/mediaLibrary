const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user') ; 

exports.signup_controller = (req, res, next) => {
    User.find({ email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1){
            return res.status(422).json({
                message: 'Mail exists'
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    }) ;
                    user
                    .save()
                    .then(result => {
                        console.log(result); 
                        res.status(201).json({
                            message: 'User created'
                        });
                    })
                    .catch(err => {
                        console.log(err); 
                        res.status(500).json({
                            error: err
                        });
                    });
        
                }
            
            });
        }
    })
   
    
}

exports.login_controller = (req, res, next) => {
    User.find({ email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1){
            return res.status(404).json({
                message: 'Mail not found, user doesn\'t exists'
            });
        }else{
            bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
                if (err){
                    return res.status(404).json({
                        message: 'Auth Failed'
                    });
                }
                if (result){
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    'secret', 
                     {
                         expiresIn: "1h"
                     }
                     );
                    return res.status(200).json({
                        message: 'Auth Successful',
                        id: user[0]._id,
                        token: token
                    }); 
                }
                return res.status(401).json({
                    message: 'Auth Failed'
                });
            }); 
        }
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json({
            error: err
        });
    });
    
}
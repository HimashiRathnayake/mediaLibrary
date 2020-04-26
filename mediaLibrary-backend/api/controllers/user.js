const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User =  require('../models/user'); 

exports.user_signup = (req, res, next) =>{
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1){
            return res.status(409).json({
                message: 'email already exists'
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user
                        .save()
                        .then(result => {
                            const token = jwt.sign({
                                email: result.email,
                                userId: result._id
                            }, process.env.JWT_KEY, 
                            {
                                expiresIn: "2 days"
                            });
                            res.status(201).json({
                                message: 'User created',
                                token: token,
                            })
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

    });
}

exports.user_login = (req, res, next) =>{
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
                if (err){
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result){
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, process.env.JWT_KEY, 
                    {
                        expiresIn: "2 days"
                    });
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    })
                }
                return res.status(401).json({
                    message: 'Auth failed'
                });
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.user_delete = (req, res, next)=>{
    User.remove({_id: req.params.userId})
    .exec()
    .then(result=> {
        console.log(result);
        res.status(200).json({
            message: 'User deleted'
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

exports.get_other_users =  (req, res, next) => {
    const email = new RegExp(req.params.email, 'i');
    User.find({email: email, _id:{$ne: req.userData.userId}})
    .exec()
    .then(docs=>{
        const response={
            count: docs.length,
            Users: docs.map(doc=>{
                return{
                    _id: doc._id,
                    email: doc.email
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

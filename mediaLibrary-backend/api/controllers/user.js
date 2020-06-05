const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

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

exports.forgot_password = (req, res, next) => {
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            var buf = crypto.randomBytes(5);
            var token = buf.toString('hex');
            User.updateOne({_id: user._id},{resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000})
            .exec()
            .then(result => {
                var transport = nodemailer.createTransport(smtpTransport({
                    service: 'Gmail',
                    auth: {
                      user: 'mymediamymedia5@gmail.com',
                      pass: 'mymedia5@'
                    },
                    tls: {rejectUnauthorized: false}
                }));
                var mailOptions = {
                    to: user.email,
                    from: 'mymediaAdmin@mymedia.com',
                    subject: 'MyMedia Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                      'Your verification code is:\n\n' +
                      token + '\n\n' +
                      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                transport.sendMail(mailOptions, function(err, response) {
                    if (err){
                        console.log(err)
                        res.status(500).json({
                            message: "Something went wrong"
                        });
                    }else{
                        console.log(response)
                        res.status(200).json({
                            message: "Verification code has sent"
                        });
                    }
                });
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(404).json({
                error: "No user found"
            });
        });
}

exports.reset_password = (req, res, next) => {
    User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
        .exec()
        .then(user => {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    User.updateOne({_id: user._id},{password:hash, resetPasswordToken: undefined, resetPasswordExpires: undefined})
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            message: "Password changed successfully"
                        });
                    })
                }
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: "Password reset token is invalid or has expired."
            });
        });
}

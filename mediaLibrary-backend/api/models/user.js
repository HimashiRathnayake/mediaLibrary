const mongoose=require('mongoose'); 

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, 
            required: true, 
            //unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
    password: {type: String, required: true},
    imgfavourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
        //addedDate: Date
    }],
    audfavourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Audio'
        //addedDate: Date
    }],
    vidfavourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
        //addedDate: Date
    }],
    notifications:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }],
    resetPasswordToken: {type: String},
    resetPasswordExpires: {type: Date}
});

module.exports = mongoose.model('User', userSchema);

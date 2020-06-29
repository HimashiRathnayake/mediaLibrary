const mongoose=require('mongoose'); 

const notificationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: {type: String, required: true},
    date: {type: Date, required:true},
    image: {type: mongoose.Schema.Types.ObjectId, ref: 'Image'},
    audio: {type: mongoose.Schema.Types.ObjectId, ref: 'Audio'},
    video: {type: mongoose.Schema.Types.ObjectId, ref: 'Video'},
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    state: {type: String, default:'unread'}
});

module.exports = mongoose.model('Notification', notificationSchema);
const mongoose=require('mongoose'); 

const albumSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    albumName: {type: String, required: true},
    userList: {type: Array, required: true},
    fileList: {type: Array, required: true}

});

module.exports = mongoose.model('User', userSchema);
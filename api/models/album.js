const mongoose=require('mongoose'); 



const albumSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,

    albumName: {type: String, required: true},

    userList: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

    fileList: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}]



});



module.exports = mongoose.model('Album', albumSchema);
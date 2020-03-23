const mongoose=require('mongoose'); 

const audioSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    videoName: {type: String, required: true},
    title: {type: String, default: 'Untitled'},
    artist: {type: String, default: 'Unknown artist'},
    accessList: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    folder: {type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true},
    path: {type: String, required: true}
});

module.exports = mongoose.model('Video', audioSchema);

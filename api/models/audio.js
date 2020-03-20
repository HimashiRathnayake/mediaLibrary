const mongoose=require('mongoose'); 

const metaDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    audioName: {type: String, required: true},
    title: {type: String, default: 'Untitled'},
    album: {type: String, default: 'Unknown album'},
    artist: {type: String, default: 'Unknown artist'},
    year: {type: String, default: ''},
    accessList: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    folder: {type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true},
    path: {type: String, required: true}

});

module.exports = mongoose.model('Audio', metaDataSchema);
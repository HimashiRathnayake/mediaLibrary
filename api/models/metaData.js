const mongoose=require('mongoose'); 

const metaDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    path: {type: String, required: true},
    fileType: {type: String, required: true},
    fileSize: {type: Number, required: true},
    date: {type: Date, required: true},
    album: {type: String, required: true},
    accessList: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    server: {type: String, required: true}
});

module.exports = mongoose.model('File', metaDataSchema);
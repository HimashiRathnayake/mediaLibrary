const mongoose=require('mongoose'); 

const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    imageName: {type: String, required: true},
    title: {type: String, default: "No title"},
    subject: {type: String, default: "No subject"},
    author: {type: String, required: "Unknown Author"},
    accessList: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    album: {type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true}
});

module.exports = mongoose.model('Image', imageSchema);
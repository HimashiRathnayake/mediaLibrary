const mongoose=require('mongoose'); 

const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    imageName: {type: String, required: true},
    title: {type: String, default: "No title"},
    subject: {type: String, default: "No subject"},
    artist: {type: String, default: "Unknown Artist"},
    accessList: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    folder: {type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true},
    path: {type: String, required: true}
});

module.exports = mongoose.model('Image', imageSchema);
const mongoose=require('mongoose'); 

const folderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    folderName: {type: String, required: true},
    userList: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    folderType: {type: String, required: true}
});

module.exports = mongoose.model('Folder', folderSchema);
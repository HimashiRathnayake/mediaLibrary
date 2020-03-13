const mongoose=require('mongoose'); 

const metaDataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fileName: {type: String, required: true},
    fileType: {type: String, required: true},
    fileSize: {type: Number, required: true},
    date: {type: Date, required: true},
    accessList: {type: Array, required: true}
});

module.exports = mongoose.model('User', userSchema);
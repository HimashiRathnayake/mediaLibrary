const exiftool = require('node-exiftool');
const exiftoolBin = require('dist-exiftool');

module.exports = (req, res, next)=>{
    try{
        const ep = new exiftool.ExiftoolProcess(exiftoolBin)
        
        ep
        .open()
        .then((pid) => {
            // console.log('Started exiftool process %s', pid);
        })
        .then(() => ep.readMetadata(req.file.path, ['-File:all']))
        .then((result)=>{
            req.data = result.data[0];
        })
        .then(() => ep.close())
        .then(() => {
            // console.log('Closed exiftool');
            next();
        })
        .catch((error)=>{
            res.status(401).json({message: 'File Not Found'})
        })
        
    }catch(error){
        return res.status(401).json({
            message: ''
        });
    }
};

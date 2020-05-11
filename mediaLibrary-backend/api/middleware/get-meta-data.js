const exiftool = require('node-exiftool');
const exiftoolBin = require('dist-exiftool');
const http = require('https');
const fs = require('fs');

module.exports = (req, res, next)=>{
    try{
        const ep = new exiftool.ExiftoolProcess(exiftoolBin)
        console.log(req.file);
        var fileNew=req.file.key;
        http.get(req.file.location, function(res){
            res.pipe(fs.createWriteStream(req.file.key));
            ep
            .open() 
            .then((pid) => {
            })
            .then(() => ep.readMetadata(fileNew, ['-File:all']))
            .then((result)=>{
                console.log(result)
                req.data = result.data[0];
            })
            .then(() => ep.close())
            .then(() => {
                fs.unlinkSync(fileNew)
                next();
            })
            .catch((error)=>{
                console.log(error)
                res.status(401).json({message: error})
            })
            })
        
    }catch(error){
        return res.status(401).json({
            message: ''
        });
    }
};

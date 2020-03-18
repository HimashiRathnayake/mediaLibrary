const NodeID3 = require('node-id3');
const ffmetadata = require('ffmetadata');

module.exports = (req, res, next)=>{
  ffmetadata.read(req.file.path, function(err, tags) {
      if (err) {
        console.error("Error reading metadata", err);
        return res.status(401).json({
                  message: 'Failed to get metadata'
        });
      }else {
        req.album = tags.album;
        req.artist = tags.artist;
        req.title = tags.title;
        req.date = tags.date;
        next();
      }
  });
  
  // try{
  //       // var tags = NodeID3.read('./uploads/test.mp3');
  //     next();
  // }catch(error){
  //     return res.status(401).json({
  //         message: 'Failed to get metadata'
  //     });
  // }
};
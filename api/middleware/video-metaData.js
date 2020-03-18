const ffmetadata = require('ffmetadata');

module.exports = (req, res, next)=>{
  ffmetadata.read(req.file.path, function(err, tags) {
      if (err) {
        console.error("Error reading metadata", err);
        return res.status(401).json({
                  message: 'Failed to get metadata'
        });
      }else {
        req.artist = tags.artist;
        req.title = tags.title;
        req.date = tags.date;
        next();
      }
  });
};

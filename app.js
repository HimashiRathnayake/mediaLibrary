const express = require('express');
const app = express();
const morgan = require('morgan');

const searchRoutes = require('./api/routes/search');
const searchImageRoutes = require('./api/routes/searchImages');
const searchAudioRoutes = require('./api/routes/searchAudios');
const searchVideoRoutes = require('./api/routes/searchVideos');

app.use(morgan('dev'));

app.use('/search', searchRoutes); 
app.use('/searchImages', searchImageRoutes); 
app.use('/searchAudios', searchAudioRoutes); 
app.use('/searchVideos', searchVideoRoutes); 

module.exports = app;

app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.ststus || 500)
    res.json({
        error: {
            message: error.message
        }
    });
});

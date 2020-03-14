const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const searchRoutes = require('./api/routes/search');
const searchImageRoutes = require('./api/routes/searchImages');
const searchAudioRoutes = require('./api/routes/searchAudios');
const searchVideoRoutes = require('./api/routes/searchVideos');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((re, res, next) => {
    res.header('Access-control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accespt, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.header('Access-ontrol-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
});

app.use('/search', searchRoutes); 
app.use('/searchImages', searchImageRoutes); 
app.use('/searchAudios', searchAudioRoutes); 
app.use('/searchVideos', searchVideoRoutes); 


app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status= 404 ;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
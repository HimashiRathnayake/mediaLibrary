const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const imageRoutes = require('./api/routes/images');
const audioRoutes = require('./api/routes/audios');
const videoRoutes = require('./api/routes/videos');
const userRoutes = require('./api/routes/user');
const folderRoutes = require('./api/routes/folders');
const shareRoutes = require('./api/routes/share');
const searchRoutes = require('./api/routes/search');

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//handle cors
app.use((req,res,next)=>{                    
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({});
    };
    next();
});

app.use('/images',imageRoutes);
app.use('/audios',audioRoutes);
app.use('/videos',videoRoutes);
app.use('/user',userRoutes);
app.use('/folders',folderRoutes);
app.use('/share', shareRoutes);
app.use('/search', searchRoutes); 

app.use((req,res,next)=>{
    const error = new Error('Route not found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

module.exports = app;


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const fileRoutes = require('./api/routes/files');
const userRoutes = require('./api/routes/user');
const albumRoutes = require('./api/routes/albums');

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

app.use('/albums',albumRoutes);
app.use('/files',fileRoutes);
app.use('/user',userRoutes);

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


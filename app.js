const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const searchRoutes = require('./api/routes/search');
const usersRoutes = require('./api/routes/users');
const searchImageRoutes = require('./api/routes/searchImages');
const searchAudioRoutes = require('./api/routes/searchAudios');
const searchVideoRoutes = require('./api/routes/searchVideos');

 mongoose.connect(
    'mongodb+srv://DBuser:DBpassword@cluster0-bwtkn.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
        
    }
    
); 
mongoose.Promise = global.Promise;


/* const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://DBuser:"+ process.env.MONGO_ATLAS_PW +"@cluster0-bwtkn.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accespt, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/search', searchRoutes); 
app.use('/users', usersRoutes); 
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
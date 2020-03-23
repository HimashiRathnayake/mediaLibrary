const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mediaLibraryAdmin:'+process.env.MONGO_ATLAS_PW+'@cluster0-3kobe.mongodb.net/mediaLibraryDB?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

// When successfully connected
mongoose.connection.on('connected', function(){
    console.log('Connected to the database successfully');
});
  
// If the connection throws an error
mongoose.connection.on('error',function(err){
    console.log('Connection error');
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function(){
    console.log('Mongoose connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function(){
    mongoose.connection.close(function (){
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
    });
});

module.exports = mongoose.connection;
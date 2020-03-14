const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://node-shop:'+process.env.MONGO_ATLAS_PW+'@cluster0-5rdgo.mongodb.net/test?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

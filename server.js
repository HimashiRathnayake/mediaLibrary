const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

//connect to database
require('./db.js');

const server = http.createServer(app);

server.listen(port, err=>{
    if (err) return console.error(err);
  console.log('Server running on port 3000');
});

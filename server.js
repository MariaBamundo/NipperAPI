var express = require('express'),
app = express(),
port = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/'));

var routes = require('./routes.js'); 
routes(app); 


app.listen(port);


console.log('Nipper RESTful API server started on: ' + port);

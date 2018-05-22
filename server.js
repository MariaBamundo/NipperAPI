//Set up express and set the process to run on port 3000
var express = require('express'),
app = express(),
port = process.env.PORT || 3000;

//This line is for accesing the project via the url provided in the readme
app.use('/', express.static(__dirname + '/'));

//Require the file containing the routes
var routes = require('./routes.js'); 

routes(app); 

//Listen on the port that is running the project
app.listen(port);

//A message to ensure the user that the server is running on port 3000
console.log('Nipper RESTful API server started on: ' + port);

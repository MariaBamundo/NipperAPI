//This file contains all of the routes for the different api endpoints 

'use strict';
module.exports = function(app) {
var controller = require('./nipperController.js');

//This needed to be added to avoid a cross site scripting error. 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
    
//Routes with their specified route handler functions declared in nipperController.js
app.route('/statues').get(controller.get_all_statues);

app.route('/statues/:name').get(controller.get_a_statue);
    
app.route('/sort_statues/:criteria/:method').get(controller.sort_by);
};
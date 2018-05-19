'use strict';

var Fuse = require('fuse.js');

function comparator(criteria, method) {
    
    return function (a,b) { 
        
        if(method == "ascending"){
            
            if(a[criteria] > b[criteria])
                return 1;
            
            else if(a[criteria] < b[criteria])
                return -1;
            
            else return 0;
        }
        
        else if(method == "descending")
            
           if(a[criteria] < b[criteria])
                return 1;
        
            else if(a[criteria] > b[criteria])
                return -1;
        
            else return 0;
        
        else console.log("invalid sorting method");
    }
    
    //If criteria is address it sorts as if the house number is a string. This can be fixed by pulling out the number and sorting as int if desired.
}

var statuesArray = require('./statues.json');

//display all data sorted by sort criteria
exports.sort_by = function(req, res) {
    var sortedStatuesArray = statuesArray.sort(comparator(req.params.criteria,req.params.method));
    res.json(sortedStatuesArray);
};

//get all statues and data
exports.get_all_statues = function(req, res) {
    res.json(statuesArray);
};


//get data for a single statue by name must implement fuzzy search
exports.get_a_statue = function(req, res) {
    
    var options = {
        keys: ['name'],
        threshold: 0.5
    };
    
    var fuzzySearch = new Fuse(statuesArray, options);
    var result = fuzzySearch.search(req.params.name);
    res.json(result);
};





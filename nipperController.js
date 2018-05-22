//This file contains all methods for fetching and organizing the data

'use strict';


//A comparator to use for string sorting
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
    
    //TODO If criteria is address it sorts as if the house number is a string. This can be fixed by pulling out the number and sorting as int if desired or perhaps by street name and then number. I left it as is because Google Sheets and Microsoft Excel default to sorting addresses as strings.
}

//A function for retrieving the artist's last name. For a case with two artists it will sort by the last name of the second artist. No longer being used because some of the artists are not people.
function get_last_word(string) {
    var words = string + "";
    var n = words.split(" ");
    return n[n.length - 1];

}

//import statues.json as an array of javascript objects
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

//this is necessary to implement the fuzzy search in the get_a_statue method below
var Fuse = require('fuse.js');

//get a statue or all statues with names similar to or equal to the name specified by the user
exports.get_a_statue = function(req, res) {
    
    //we are only searching by name and the threshold is set to 0.5 to allow for typos and names that are slightly off
    var options = {
        keys: ['name'],
        threshold: 0.5
    };
    
    //here is where the actual fuzzy search is implemented
    var fuzzySearch = new Fuse(statuesArray, options);
    var result = fuzzySearch.search(req.params.name);
    res.json(result);
};





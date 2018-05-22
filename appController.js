//Controller for angular functions used by buttons and filter bar
app.controller('appController', function($scope, $http, $window) {

    //The title to be displayed on the page
    $scope.title = 'Nipper The Dog Statues';

    
    $scope.single_statue = ''; 
    
    //Display all statues and data 
    $scope.show_data = function() {
        $http.get("http://localhost:3000/statues")
            .then(function(response) {
                $scope.statues = response.data;
            });
    };
    
    //Change the value of a button once it is clicked so the next click of that button will sort by the opposite
    function change(id){
        var elem = document.getElementById(id);
        if (elem.value=="asc") elem.value = "desc";
        else elem.value = "asc";
    }
    
    //This function uses the search criteria (artist, address or name) and checks the value of the button to determine weather that data should be ascending or descending. The url specified in route.js changes depending on the value of the button and the parameter criteria.
    $scope.order_by = function(id, criteria) {
        var elem = document.getElementById(id);
        var my_url = "";
        if (elem.value=="asc"){
            my_url = "http://localhost:3000/sort_statues/"+criteria+"/ascending";
        }
        else{
            my_url = "http://localhost:3000/sort_statues/"+criteria+"/descending";
        }
        $http.get(my_url)
            .then(function(response) {
                $scope.statues = response.data;
            });
        change(id);
    };

    //Use the route for searching to get a statue with a given name.
    $scope.search = function() {
        var name = document.getElementById("search").value;
        $http.get("http://localhost:3000/statues/"+name)
            .then(function(response) {
                $scope.statues = response.data;
            });
    };

    //A method for storing a javascript object locally using cookies
    $scope.set_single_statue = function(){
        $window.localStorage.setItem("singleStatueSearchKey",event.target.id);        
        $window.location.href= "http://localhost:3000/#/singleView"; 
    }
    
    //A method for getting the statue stored in the above method. It also removes the item so it is not used again.
    $scope.get_single_statue = function(){
        var name = $window.localStorage.getItem("singleStatueSearchKey")    
        $http.get("http://localhost:3000/statues/"+name)
            .then(function(response) {
                $scope.single_statue = response.data[0];
            });
        $window.localStorage.removeItem("singleStatueSearchKey");   
    }
    
    //A method for going back to the collection view from the single view page.
    $scope.back = function(){      
        $window.location.href= "http://localhost:3000/"; 
    }
    
});


app.controller('appController', ['$scope', '$http', function($scope, $http) {

    $scope.title = 'Nipper The Dog Statues';

    //Display all statues and data 
    $scope.show_data = function() {
        $http.get("http://localhost:3000/statues")
            .then(function(response) {
                $scope.products = response.data;
            });
    };
    
    function change(id){
        var elem = document.getElementById(id);
        if (elem.value=="asc") elem.value = "desc";
        else elem.value = "asc";
    }
    
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
                $scope.products = response.data;
            });
        change(id);
    };

    $scope.search = function() {
        var name = document.getElementById("search").value;
        $http.get("http://localhost:3000/statues/"+name)
            .then(function(response) {
                $scope.products = response.data;
            });
    };
    
}]);


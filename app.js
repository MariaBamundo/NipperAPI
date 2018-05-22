//just to get angular started
var app = angular.module("myApp", ["ngRoute"]);

//Establishing the routes for each view using angular.js
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "collectionView.html",
            controller: "appController",
        })
        .when("/singleView", {
            templateUrl: "singleView.html",
            controller: "appController",
        });
 
});

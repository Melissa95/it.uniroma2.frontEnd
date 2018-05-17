
// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ngRoute', 'myApp.homeSignIn']);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "html/home.html"
            //controller: "homeCtrl"
        })
        .when("/homeLogin", {
            templateUrl: "html/homeLogin.html",
            controller: "ctrlLogin"
        })
        .when("/homeSignIn", {
            templateUrl: "html/homeSignIn.html",
            controller: "ctrlSignIn"
        })


});


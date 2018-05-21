
// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ngRoute']);

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
        .when("/homeCustomer", {
            templateUrl: "html/homeCustomer.html"
            //controller: "ctrlSignIn"
        })
        .when("/insertProduct",{
            templateUrl: "html/insertProduct.html",
            controller: "ctrlProduct"
        })
        .when("/homeCustomer", {
            templateUrl: "html/homeCustomer.html",
            controller: "ctrlCust"

        })
        .when("/createTicket", {
           templateUrl: "html/createTicket.html",
           controller: "ctrlTicket"
        })
        .when("/modifyUser",{
            templateUrl: "html/modifyUser.html",
            controller: "ctrlModifyUser"
        })
        .when("/showProducts",{
            templateUrl: "html/showProducts.html",
            controller: "ctrlProduct"
        })
        .when("/showAllTickets",{
            templateUrl: "html/showAllTickets.html",
            controller: "ctrlTicket"
        })



});


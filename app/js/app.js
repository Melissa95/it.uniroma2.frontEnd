
// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ngRoute','ngResource','AuthServices']);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "html/home.html"
            //controller: "ModalDemoCtrl"
        })
        .when("/homeLogin", {
            templateUrl: "html/homeLogin.html",
            controller: "ctrlLogin"
            //controller: "ModalDemoCtrl"
        })
        .when("/homeSignIn", {
            templateUrl: "html/homeSignIn.html",
            controller: "ctrlSignIn"
        })
        .when("/insertTarget",{
            templateUrl: "html/insertTarget.html",
            controller: "ctrlTarget",
            requiresAuthentication: true,
            permissions: ["admin"]
        })
        .when("/homeCustomer", {
            templateUrl: "html/homeCustomer.html",
            controller: "ctrlCust",
            requiresAuthentication: true

        })
        .when("/createTicket", {
           templateUrl: "html/createTicket.html",
           controller: "ctrlTicket",
            requiresAuthentication: true
        })
        .when("/modifyUser",{
            templateUrl: "html/modifyUser.html",
            controller: "ctrlModifyUser"
        })
        .when("/showTargets",{
            templateUrl: "html/showTargets.html",
            controller: "ctrlTarget",
            requiresAuthentication: true,
            permissions: ["admin"]
        })
        .when("/showAllTickets",{
            templateUrl: "html/showAllTickets.html",
            controller: "ctrlTicket",
            requiresAuthentication: true,
            permissions: ["admin"]
        })
        .when("/relation",{
            templateUrl: "html/relation.html",
            controller:"ctrlRelation",
            requiresAuthentication: true,
            permission: ["admin"]
        })
        .when("/showMyTicket",{
            templateUrl: "html/showMyTicket.html",
            controller: "ctrlUserTicket",
            requiresAuthentication: true,
            permission: ["customer"]
        })


});



app.run(function ($rootScope, $location, Auth) {
    Auth.init();

    $rootScope.$on('$routeChangeStart', function (event, next) {
        if (!Auth.checkPermissionForView(next)) {
            event.preventDefault();
            $location.path("/homeLogin");
        }
    });
});


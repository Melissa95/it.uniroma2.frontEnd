
// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ngRoute','ngResource','AuthServices','ngAnimate','ui.bootstrap','ngMaterial']);


app.config(function($routeProvider,$mdThemingProvider) {
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
            permission: ["customer", "admin"]
        })
        .when("/defineNewRelation",{
            templateUrl: "html/defineNewRelation.html",
            controller:"ctrlNewRelation",
            requiresAuthentication: true,
            permission: ["admin"]
        })
        .when("/defineEscalation",{
            templateUrl: "html/defineEscalation.html",
            controller:"ctrlEscalation",
            requiresAuthentication: true,
            permission: ["admin"]
        })
        .when("/showQueue",{
            templateUrl: "html/showQueue.html",
            controller:"ctrlQueue",
            requiresAuthentication: true,
            permission: ["admin"]
        })
        .when("/gantt",{
            templateUrl:"html/gantt.html",
            controller:"MainGanttCtrl",
            requiresAuthentication: true,
            permission: ["customer", "admin"]
        });



    $mdThemingProvider.theme('red')
        .primaryPalette('red');

    $mdThemingProvider.theme('blue')
        .primaryPalette('blue');



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

app.controller('sideNavCtrl', function ($scope, $mdSidenav, $interval) {
    $scope.toggleLeft = buildToggler('left');



    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }

    $scope.theme = 'red';

    var isThemeRed = true;

    $interval(function () {
        $scope.theme = isThemeRed ? 'blue' : 'red';

        isThemeRed = !isThemeRed;
    }, 2000);



    $scope.accordianData = [
        { "heading" : [{"type":"Account","perm":"['customer','admin']"}],    "content" : [{"name":"Modify account","html":"#!/modifyUser","permission":"['admin','customer']"},{"name":"Sign Out","html":"#!/","permission":"['admin','customer']"}] },
        { "heading" : [{"type":"Ticket","perm":"['customer', 'admin']"}],     "content" : [{"name":"New Ticket","html":"#!/createTicket","permission":"['admin','customer']"},{"name":"My Tickets","html":"#!/showMyTicket","permission":"['admin','customer']"},{"name":"All tickets","html":"#!/showAllTickets","permission":"['admin']"}]},
        { "heading" : [{"type":"Target","perm":"['admin']"}],             "content" : [{"name":"New Target","html":"#!/insertTarget","permission":"['admin']"},{"name":"All targets","html":"#!/showTargets","permission":"['admin']"}] },
        { "heading" : [{"type":"Relation","perm":"['admin']"}],   "content" : [{"name":"define new relation","html":"#!/defineNewRelation","permission":"['admin']"},{"name":"create relation","html":"#!/relation","permission":"['admin']"}] },
        { "heading" : [{"type":"Escalation","perm":"['admin']"}],   "content" : [{"name":"define escalation","html":"#!/defineEscalation","permission":"['admin']"},{"name":"show queue","html":"#!/showQueue","permission":"['admin']"}] },
        { "heading" : [{"type":"Schedule","perm":"['customer','admin']"}],   "content" : [{"name":"gantt","html":"#!/gantt","permission":"['admin','customer']"}] }


    ];

    // To expand or collapse the current view
    //This functionality automatically closes the other expanded lists
    $scope.toggleView = function(ary, data, index){
        for(var i=0; i<ary.length; i++){
            if(i!=index) { ary[i].expanded=false; }
            else { data.expanded=!data.expanded; }
        }
    }


});

app.filter("UserFilter", function(){

    return function(accordianData,role){

        var addPerm;

        var selectedPerm = [];
        for(i=0;i<accordianData.length;i++){


            addPerm = false;

            for(j=0;j<accordianData[i].heading.length;j++){

                if(accordianData[i].heading[j].perm.indexOf(role) >= 0 ){
                    addPerm = true;
                }
            }

            if (addPerm){
                selectedPerm.push(accordianData[i]);

            }
        }

        return selectedPerm;
    };

});





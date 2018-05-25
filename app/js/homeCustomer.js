app.controller('ctrlCust', function($scope,$http,$location,$rootScope, Auth) {


    $scope.newTicket = function() {
        $location.path('/createTicket');
    }



    $rootScope.logout = function(){
            Auth.logout();
            $location.path("/login");
    };

});
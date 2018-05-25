app.controller('ctrlCust', function($scope,$http,$location,$rootScope, $location, Auth) {


    $scope.newTicket = function() {
        $location.path('/createTicket');
    }



    $rootScope.logout = function(){
            Auth.logout();
            $location.path("/login");
    };

});
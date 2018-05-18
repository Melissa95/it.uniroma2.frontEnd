app.controller('ctrlCust', function($scope,$http,$location) {

    $scope.newTicket = function() {
        $location.path('/createTicket');
    }
});
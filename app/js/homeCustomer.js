app.controller('ctrlCust', function($scope,$http,$location,$rootScope, Auth,$log) {


    $scope.newTicket = function() {
        $location.path('/createTicket');
    };



    $rootScope.logout = function(){
            Auth.logout();
            $location.path("/login");
    };


    /*$scope.items = [
        'The first choice!',
        'And another choice for you.',
        'but wait! A third!'
    ];

    $scope.status = {
        isopen: false
    };

    $scope.toggled = function(open) {
        console.log("sono nel toggled");
        $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };

    $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));
*/
});


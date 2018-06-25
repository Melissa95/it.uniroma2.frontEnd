app.controller('ctrlCust', function($scope,$http,$location,$rootScope, Auth,$uibModal,$mdDialog) {


    $scope.newTicket = function() {
        $location.path('/createTicket');
    };



    $rootScope.logout = function(){
            Auth.logout();
            $location.path("/login");
    };

    $scope.openModal = function() {
        $mdDialog.show({
            controller: "ctrlTeam",
            templateUrl: 'html/modalTeam.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true

        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };

});


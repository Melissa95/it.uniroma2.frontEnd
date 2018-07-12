app.controller('ctrlTeam',['$scope','$mdDialog','myAjax','Auth','$location','$sessionStorage',function($scope,$mdDialog,myAjax,Auth,$location,$sessionStorage){

    $scope.myTeams = null;
    $scope.result = true;

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        if ($scope.myTeams.length === 0) {
            $mdDialog.hide(answer);
        }
    };


    $scope.getTeam = function () {

        var init = function () {
            var param = {};
            myAjax.getMyTeam(param,Auth.currentUser().username).then(function (response) {

                if (response.status === 200) {

                    $scope.myTeams = response.data;
                    if($scope.myTeams.length === 0) {
                        $scope.result = false;
                    }else {
                        $scope.result = true;
                    }

                }
            }, function () {

                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Operation failed')
                        .textContent("Error in getting team")
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')
                        .targetEvent()
                );
            });
        };


        init();
    };



    $scope.getTeam();

    $scope.showGantt = function (team) {

        $sessionStorage.team = team;


        $scope.cancel();
        if ($scope.myTeams.length === 0) {
            $location.path("/homeCustomer");
        }else {
            $location.path("/gantt");
        }


    };



}]);





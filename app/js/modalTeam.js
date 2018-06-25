app.controller('ctrlTeam',['$scope','myService','$mdDialog','myAjax','Auth','$location',function($scope,myService,$mdDialog,myAjax,Auth,$location){

    $scope.myTeams = null;

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };


    $scope.getTeam = function () {

        var init = function () {
            var param = {};
            myAjax.getMyTeam(param,Auth.currentUser().username).then(function (response) {

                if (response.status === 200) {

                    $scope.myTeams = response.data;

                }
            }, function () {

                console.log("Error in getting team");
            });
        };


        init();
    };



    $scope.getTeam();

    $scope.showGantt = function (team) {

        myService.dataObj.team = team;


        $scope.cancel();
        $location.path("/gantt");

    }



}]);





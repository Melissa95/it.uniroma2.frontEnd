app.controller('modalCtrlTarget',['$scope','myService','$mdDialog','myAjax',function($scope,myService,$mdDialog,myAjax){


    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };

    $scope.idTarget = myService.dataObj;


    var init = function () {
        var param = {};
        myAjax.getDetailsTarget(param, $scope.idTarget.id).then(function (response) {

            if (response.status === 200) {
                $scope.target = response.data;


            }

        }, function () {

            alert("error in show details");
        });
    };

    init();



}]);

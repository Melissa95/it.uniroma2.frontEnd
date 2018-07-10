'use strict';


app.controller('MainGanttCtrl', function($scope,myAjax,myService,$mdDialog,$sessionStorage) {


    $scope.tasks = {

        data: []
    };

    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);

    };

    $scope.planning = function(){
        $mdDialog.show({
            controller: "ctrlPlanning",
            templateUrl: 'html/modalPlanning.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true

        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };


    $scope.getGantt = function() {


       // $scope.team = myService.dataObj.team;

        $scope.team = $sessionStorage.team;

        var init = function () {
            var param = {};
            var i;

            myAjax.getTicketGantt(param,$scope.team).then(function (response) {

                if (response.status === 200) {

                    for(i = 0; i < response.data.length; i++) {

                        var tick = {};

                        tick.id = response.data[i].id;
                        tick.text = response.data[i].title;
                        tick.start_date = response.data[i].dateExecutionStart;
                        tick.duration = response.data[i].durationEstimation;
                        $scope.tasks.data.push(tick);

                    }


                }


            }, function () {

                alert("error in gantt");
            });
        };

        init();

    };

    $scope.getGantt();


    /*$scope.refreshPage = function () {

        $scope.showGantt();

    };

    $scope.refreshPage();*/





});
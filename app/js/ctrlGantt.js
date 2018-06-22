'use strict';


app.controller('MainGanttCtrl', function($scope,myAjax) {


    $scope.tasks = {

        data: []
    };


    $scope.getGantt = function() {


        var init = function () {
            var param = {};
            var i,j;

            myAjax.getTicketGantt(param).then(function (response) {

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




});
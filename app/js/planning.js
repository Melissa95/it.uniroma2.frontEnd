app.controller('ctrlPlanning',['$scope','myService','myAjax','Auth', '$mdDialog',function($scope,myService,myAjax,Auth, $mdDialog){

    $scope.myTeams = null;
    $scope.penTicket = null;
    $scope.date=null;


    $scope.date =new Date();

    this.isOpen = false;

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

    $scope.getPendingTicket = function () {

        var init = function () {
            var param = {};
            myAjax.getQueue(param).then(function (response) {

                if (response.status === 200) {

                    $scope.penTicket = response.data;


                }
            }, function () {

                console.log("Error in getting pending ticket");
            });
        };


        init();
    };


    $scope.sendPlanning= function () {
       var d= $scope.date.getDate() + "-"+ $scope.date.getMonth()+ "-"+$scope.date.getFullYear()+"-------------"+$scope.date.getHours()+":"+$scope.date.getMinutes()
        console.log("DATAAAAAAAAAA"+ d);

        var init = function () {
            var param = {
                        id:$scope.ticket,
                        team:{
                            teamName:$scope.team.teamName

                        }
            };

            myAjax.getPlanning(param,$scope.team.teamName,d,$scope.duration,$scope.ticket).then(function (response) {

                if (response.status === 200) {

                    $scope.showGantt();

                    $mdDialog.show({
                        controller: "MainGanttCtrl",
                        templateUrl: 'html/modalGantt.html',
                        parent: angular.element(document.body),
                        clickOutsideToClose:true

                    }).then(function(answer) {
                            $scope.status = 'You said the information was "' + answer + '".';
                        }, function() {
                            $scope.status = 'You cancelled the dialog.';
                        });
                }


            }, function () {

                alert("error in gantt");
            });
        };

        init();


    };

    $scope.showGantt= function () {



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




   /* $scope.showGantt = function (team) {

        myService.dataObj.team = team;

        $scope.cancel();
        if ($scope.myTeams.length === 0) {
            $location.path("/homeCustomer");
        }else {
            $location.path("/gantt");
        }

    }*/



}]);





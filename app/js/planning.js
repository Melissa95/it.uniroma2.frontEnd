app.controller('ctrlPlanning',['$scope','myService','myAjax','Auth','$location','$mdDialog','$route',function($scope,myService,myAjax,Auth, $location,$mdDialog,$route){

    $scope.myTeams = null;
    $scope.penTicket = null;
    $scope.date=null;


    $scope.date =new Date();

    this.isOpen = false;

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

    $scope.getPendingTicket();


    $scope.sendPlanning= function () {
       var d= $scope.date.getDate() + "-"+ $scope.date.getMonth()+ "-"+$scope.date.getFullYear()+" "+$scope.date.getHours()+":"+$scope.date.getMinutes()+":"+$scope.date.getSeconds();
        console.log("DATAAAAAAAAAA"+ d);

        var init = function () {
            var param = {
                        id:$scope.ticket,
                        durationEstimation: $scope.duration,
                        dateExecutionStart: d,
                        team:{
                            teamName:$scope.team.teamName

                        },
                        status:'execution'
            };

            myAjax.getPlanning(param,$scope.team.teamName,d,$scope.duration,$scope.ticket).then(function (response) {

                if (response.status === 200) {


                    $scope.cancel();
                    $route.reload();


                }


            }, function (err) {

                var messageError = null;

                    if(err.status === 406) {
                        messageError = "Planning failed following day not available: ";

                        for(var g = 0; g < err.data.length; g++){

                            messageError = messageError + err.data[g].keyGanttDay.day +" " + ";" ;

                        }
                        console.log(messageError);

                    }

                    if (err.status === 424) {

                        var init = function () {
                            var param = {};
                            myAjax.getFatherTicket(param,$scope.ticket).then(function (response) {
                                messageError = "Planning failed. Need to resolve the following ticket first: \n "  ;
                                if (response.status === 200) {

                                    for(var g = 0; g < response.data.length; g++){
                                        messageError = messageError + response.data[g].id + " " + response.data[g].title +  "\n";

                                    }

                                }
                            }, function () {

                                messageError = "Planning failed internal error cause";

                            });
                        };

                        init();


                    }



                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Operation failed')
                        .textContent(messageError)
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                        .targetEvent()
                );

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





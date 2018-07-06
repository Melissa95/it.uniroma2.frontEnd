app.controller('DialogController',['$scope','myService','$mdDialog','myAjax',function($scope,myService,$mdDialog,myAjax){


    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };

    $scope.idTick = myService.dataObj;


    var init = function () {
        var param = {};
        myAjax.getDetailsTicket(param, $scope.idTick.id).then(function (response) {

            if (response.status === 200) {
                $scope.ticket = response.data;

                //$scope.showRelationTicket();

               // $scope.showRelationCustomTicket($scope.ticket.id);
            }

        }, function () {

            alert("error in show details");
        });
    };

    init();


        $scope.showRelationTicket = function () {

            var param = {};
            myAjax.getRelationTicket(param).then(function (response) {

                //$scope.items = data;
                if (response.status === 200) {
                    $scope.relationName = response.data;
                }
            }, function () {

                alert("Error getting relation's name");
            });


        };

        $scope.showRelationCustomTicket = function (ticketId) {
            var param = {};
            myAjax.getRelationCustomTicket(param, ticketId).then(function (response) {

                if (response.status === 200) {
                    $scope.relTicket = response.data;
                }
            }, function () {

                alert("Error getting relation's name");
            });
        };

        $scope.relation = function() {

            $scope.showRelationTicket();

            $scope.showRelationCustomTicket($scope.ticket.id);
        }

}]);





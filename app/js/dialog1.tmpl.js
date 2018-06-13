app.controller('DialogController',['$scope','myService','$mdDialog','$http',function($scope,myService,$mdDialog,$http){

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

    var url = "http://localhost:8200/ticketingsystem/ticket/" + $scope.idTick.id;

    $http ({
        method: 'GET',
        url: url


    }).then(function (response) {

        if (response.status === 200) {
            console.log("sono nella prima http");
            $scope.ticket = response.data;

            var urlRelationName = "http://localhost:8200/ticketingsystem/relation";

            $http ({
                method: 'GET',
                url: urlRelationName

            }).then(function (response) {

                if (response.status === 200) {
                    $scope.relationName = response.data;
                }
            }).catch(function() {

                console.log("ERROR GETTING RELATION NAME");
                alert("Error getting relation's name");
            });

            var urlRel = "http://localhost:8200/ticketingsystem/relationInstance/findRelations/" + $scope.ticket.id;

            $http ({
                method: 'GET',
                url: urlRel

            }).then(function (response) {

                if (response.status === 200) {
                    $scope.relTicket = response.data;
                }
            }).catch(function() {

                console.log("ERROR GETTING RELATION");
                alert("Error getting relations 7");
            });

        }

    }).catch(function() {

        alert("error in show details");
    });
}]);
app.controller('ctrlEscalation', function($scope, $http,$location) {

    console.log("sono nel controller");
    $scope.result = true;
    $scope.resultNegative = true;




    $scope.defineEscalation = function () {

        console.log("sono in define esclation");

        var url = "http://localhost:8200/ticketingsystem/escalation";
        //var url = "http://192.168.43.101:8200/ticketingsystem/product";


        $http({
            method: 'POST',
            url: url,
            dataType: 'json',
            data: {
                customerPriority: $scope.customerPriority,
                teamPriority: $scope.teamPriority,
                time: $scope.time

            },
            headers: {'Content-Type': 'application/json; charset=UTF-8'}


        }).then(function (response) {

            if (response.status === 201)
                $scope.result = false;
            $scope.customerPriority = "";
            $scope.teamPriority = "";
            $scope.time = "";
            $scope.resultNegative = true;
            $location.path("/showQueue");

        }).catch(function () {

            $scope.resultNegative = false;
            $scope.customerPriority = "";
            $scope.teamPriority = "";
            $scope.time = "";
            $scope.result = true;
        });


    }





});
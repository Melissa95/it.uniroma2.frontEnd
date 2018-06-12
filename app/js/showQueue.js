

app.controller('ctrlQueue', function($scope, $http,$location) {

    $scope.records;

    $scope.showQueue = function () {

        console.log("sono in show queue " );

        var url = "http://localhost:8200/ticketingsystem/ticket/findTicketInQueue";

        //var url = "http://192.168.43.101:8200/ticketingsystem/product";

        //var records;

        $http ({
            method: 'GET',
            url: url,
            dataType: 'json',
            params: "",
            headers: {'Content-Type': 'application/json; charset=UTF-8'}


        }).then(function (response) {

            if (response.status === 201)
                $scope.result=false;

            $scope.records = response.data;
            console.log(response.data );


            $scope.resultNegative=true;

        }).catch(function() {

            $scope.resultNegative=false;

            $scope.result=true;
        });

    }
    console.log("sono dopo show quee");

    $scope.showQueue();

});
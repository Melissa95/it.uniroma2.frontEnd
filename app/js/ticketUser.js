app.controller('ctrlUserTicket', function($scope,$http,$location, $sessionStorage) {


    $scope.ShowMyTickets = function () {

        console.log("sono in showMyTickets " );

        var url = "http://localhost:8200/ticketingsystem/ticket/getTicketsByUser";

        //var url = "http://192.168.43.101:8200/ticketingsystem/product";

        //var records;

        $http ({
            method: 'POST',
            url: url,
            dataType: 'json',
            data:  {
                username: $sessionStorage.user.username,
            },
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

    console.log("sono dopo show My ticket");

    $scope.ShowMyTickets();
});
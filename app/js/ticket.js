app.controller('ctrlTicket', function($scope,$http,$location) {

    $scope.priority = ["1","2","3","4","5"];

    $scope.createTick=function () {

        var url = "http://localhost:8200/ticketingsystem/ticket";

        var date = new Date();
        console.log("in creation ticket "+ $scope.customerPriority);
        console.log("in creation ticket "+ date.getDate() +"/" + date.getMonth() + "/" + date.getFullYear());

        $http ({
            method: 'POST',
            url: url,
            dataType: 'json',
            data: {
                title: $scope.title,
                category: $scope.category,
                //product: $scope.product,
                description: $scope.description,
                customerPriority: $scope.customerPriority,
                "status": "new",
                "dateStart":date.getDate() +"/" + date.getMonth() + "/" + date.getFullYear()
            },
            headers: {'Content-Type': 'application/json; charset=UTF-8'}


        }).then(function (response) {

            if (response.status === 201) alert("Ticket create with success");

        }).catch(function() {

            alert("Error in ticket's creation");
        });


    }

    $scope.showAllTickets = function () {

        console.log("sono in showAllTickets " );

        var url = "http://localhost:8200/ticketingsystem/ticket";

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
    console.log("sono dopo show All ticket");

    $scope.showAllTickets();

});

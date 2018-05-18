app.controller('ctrlTicket', function($scope,$http,$location) {

    $scope.priority = ["1","2","3","4","5"];

    $scope.createTick=function () {

        var url = "http://localhost:8200/ticketingsystem/ticket";

        var date = new Date();

        console.log("in creation ticket "+ $scope.customerPriority);
        console.log("in creation ticket "+ date.getDate());

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
                "dateStart":date.getDate()
            },
            headers: {'Content-Type': 'application/json; charset=UTF-8'}


        }).then(function (response) {

            if (response.status === 201) alert("Ticket create with success");

        }).catch(function() {

            alert("Error in ticket's creation");
        });




    }

});

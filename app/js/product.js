
app.controller('ctrlProduct', function($scope,$http) {

    console.log("sono nel controller");

    $scope.insertProduct = function() {

        console.log("sono in insert product");


        var url = "http://192.168.43.101:8200/ticketingsystem/product";


        $http ({
            method: 'POST',
            url: url,
            dataType: 'json',
            data: {
                name: $scope.name,
                version: $scope.version,
                description: $scope.description

            },
            headers: {'Content-Type': 'application/json; charset=UTF-8'}


        }).then(function (response) {

            if (response.status === 201) alert("Insert success");

        }).catch(function() {

            //attivata se username è gia presente
            alert("Error in insert product");
        });



    }

});
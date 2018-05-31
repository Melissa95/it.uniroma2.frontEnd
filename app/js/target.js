
app.controller('ctrlTarget', function($scope, $http,$location) {

    console.log("sono nel controller");
    $scope.result = true;
    $scope.resultNegative = true;
    $scope.records;



    $scope.insertProduct = function() {

        console.log("sono in insert product");

        var url = "http://localhost:8200/ticketingsystem/target";
        //var url = "http://192.168.43.101:8200/ticketingsystem/product";


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

            if (response.status === 201)
                $scope.result=false;
                $scope.name="";
                $scope.version="";
                $scope.description="";
                $scope.resultNegative=true;
                $location.path("/showTargets");

        }).catch(function() {

            $scope.resultNegative=false;
            $scope.name="";
            $scope.version="";
            $scope.description="";
            $scope.result=true;
        });



    }


    $scope.showProducts = function () {

        console.log("sono in show product " );

        var url = "http://localhost:8200/ticketingsystem/target";

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
    console.log("sono dopo show product");

    $scope.showProducts();

});
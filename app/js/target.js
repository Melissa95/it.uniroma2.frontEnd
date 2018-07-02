
app.controller('ctrlTarget', function($scope,myAjax,$location) {

    console.log("sono nel controller");
    $scope.result = true;
    $scope.resultNegative = true;
    $scope.records;



    $scope.insertProduct = function() {


        var init = function () {
            var param = {
                name: $scope.name,
                version: $scope.version,
                description: $scope.description
            };
            myAjax.createTarget(param).then(function (response) {

                //$scope.items = data;
                if (response.status === 200) {
                    $scope.result = false;
                    $scope.name = "";
                    $scope.version = "";
                    $scope.description = "";
                    $scope.resultNegative = true;
                    $location.path("/showTargets");
                }

            }, function () {

                $scope.resultNegative=false;
                $scope.name="";
                $scope.version="";
                $scope.description="";
                $scope.result=true;
            });
        };

        init();



    };


    $scope.showProducts = function () {

        var param = {};

        var init = function () {

            myAjax.getTargets(param).then(function (response) {

                if (response.status === 200) {
                    $scope.result = false;

                    $scope.records = response.data;
                    console.log(response.data);


                    $scope.resultNegative = true;
                }
            }, function () {

                $scope.resultNegative=false;

                $scope.result=true;
            });
        };

        init();


    };

    $scope.showProducts();

});
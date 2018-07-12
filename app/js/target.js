
app.controller('ctrlTarget', function($scope,myAjax,$location,$mdDialog) {

    console.log("sono nel controller");

    $scope.records;



    $scope.insertProduct = function() {


        var init = function () {
            var param = {
                name: $scope.name,
                version: $scope.version,
                description: $scope.description
            };
            myAjax.createTarget(param).then(function (response) {

                if (response.status === 201) {
                    $scope.name = "";
                    $scope.version = "";
                    $scope.description = "";
                    $location.path("/showTargets");
                }

            }, function () {

                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Operation failed')
                        .textContent("Error in target's creation")
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')
                        .targetEvent()
                );

                $scope.name="";
                $scope.version="";
                $scope.description="";
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
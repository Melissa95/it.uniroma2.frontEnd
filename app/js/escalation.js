app.controller('ctrlEscalation', function($scope,myAjax,$location) {

    console.log("sono nel controller");
    $scope.result = true;
    $scope.resultNegative = true;




    $scope.defineEscalation = function () {


        var init = function () {
            var param = {
                customerPriority: $scope.customerPriority,
                teamPriority: $scope.teamPriority,
                time: $scope.time
            };
            myAjax.escalation(param).then(function (response) {

                if (response.status === 200) {
                    $scope.result = false;
                    $scope.customerPriority = "";
                    $scope.teamPriority = "";
                    $scope.time = "";
                    $scope.resultNegative = true;
                    $location.path("/showQueue");

                }
            }, function () {

                $scope.resultNegative = false;
                $scope.customerPriority = "";
                $scope.teamPriority = "";
                $scope.time = "";
                $scope.result = true;
            });
        };

        init();




    }





});
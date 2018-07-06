app.controller('ctrlEscalation', function($scope,myAjax,$location) {

    console.log("sono nel controller");
    /*$scope.result = true;
    $scope.resultNegative = true;*/




    $scope.defineEscalation = function () {


        var init = function () {
            var param = {
                customerPriority: $scope.customerPriority,
                teamPriority: $scope.teamPriority,
                time: $scope.time
            };
            myAjax.escalation(param).then(function (response) {

                if (response.status === 201) {
                    console.log("Escalation creata");
                    $scope.customerPriority = "";
                    $scope.teamPriority = "";
                    $scope.time = "";
                    alert("Escalation created");


                }
            }, function () {

                $scope.customerPriority = "";
                $scope.teamPriority = "";
                $scope.time = "";
                alert("Error creation escalation");
            });
        };

        init();




    }





});
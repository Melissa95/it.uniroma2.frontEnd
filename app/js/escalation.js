app.controller('ctrlEscalation', function($scope,myAjax,$mdDialog) {



    $scope.defineEscalation = function () {


        var init = function () {
            var param = {
                customerPriority: $scope.customerPriority,
                teamPriority: $scope.teamPriority,
                time: $scope.time
            };
            myAjax.escalation(param).then(function (response) {

                if (response.status === 201) {
                    $scope.customerPriority = "";
                    $scope.teamPriority = "";
                    $scope.time = "";

                    $mdDialog.show(
                        $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Operation success')
                            .textContent("Escalation created")
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Got it!')
                            .targetEvent()
                    );


                }
            }, function () {

                $scope.customerPriority = "";
                $scope.teamPriority = "";
                $scope.time = "";
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Operation failed')
                        .textContent("Error in escalation's creation")
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                        .targetEvent()
                );
            });
        };

        init();




    }





});
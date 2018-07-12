app.controller('ctrlNewRelation', function($scope, myAjax, $location,$mdDialog) {


    $scope.cyclic = false;

    $scope.createNewRel = function() {


        var init = function () {
            var param = {
                name: $scope.name,
                cyclic: $scope.cyclic
            };
            myAjax.newRelation(param).then(function (response) {

                if (response.status === 201) {

                    $mdDialog.show()
                    {
                        var resp = $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Operation success')
                            .textContent('Relation created with success')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Ok')
                            .targetEvent();

                        $mdDialog.show(resp).then(function () {
                            $location.path("/relation");
                        }, function () {
                            console.log("error");

                        });
                    };
                }


            }, function (err) {

                if (err.status === 302) {

                    $mdDialog.show()
                    {
                        var resp = $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#popupContainer')))
                            .clickOutsideToClose(true)
                            .title('Operation failed')
                            .textContent('Error in relation\'s creation')
                            .ariaLabel('Alert Dialog Demo')
                            .ok('Ok')
                            .targetEvent();

                        $mdDialog.show(resp).then(function () {
                            $location.path("/defineNewRelation");
                        }, function () {
                            console.log("error");

                        });
                    };
                }
            });
        };

        init();

    }

});


/*app.controller('ctrlLogin', function($scope,$http,$location) {

    $scope.login = function() {
//inviare sia username che password
        console.log("nel login" + $scope.username);
        console.log($scope.password);
        var url = "http://localhost:8200/ticketingsystem/user/login";

        $http ({
            method: 'POST',
            url: url,
            dataType: 'json',
            data: {

                username: $scope.username,
                password: $scope.password

            },
            headers: {'Content-Type': 'application/json; charset=UTF-8'}

        }).then(function (response) {

            if (response.status === 200) {
                alert( "login");
                $scope.log = 1
                $location.path('/homeCustomer');
            }



        }).catch(function(response) {

            //username ok, password wrong
            if (response.status === 302) {
                alert("Password wrong");
            }
            //username wrong
            if (response.status === 404) {
                alert("Username wrong");
            }

        });

    }

});*/

app.controller('ctrlLogin', function($scope, $location, Auth) {

    $scope.username = "";
    $scope.password = "";
    $scope.failed = false;

    $scope.login = function() {
        Auth.login($scope.username, $scope.password)
            .then(function() {
                console.log("qui");
                $location.path("/homeCustomer");
            }, function() {
                $scope.failed = true;
            });
    };

});

/*app.controller('ModalDemoCtrl', function ($uibModal, $log, $document) {
    var $ctrl = this;

    console.log("sono quiiii");

    $ctrl.animationsEnabled =false;

    $ctrl.open = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return $ctrl.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $ctrl.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };


});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

/*app.controller('ModalInstanceCtrl', function ($uibModalInstance, $location) {
    var $ctrl = this;


    $ctrl.ok = function () {
        //$uibModalInstance.close($ctrl.selected.item);
        $uibModalInstance.close('cancel');
        $location.path('/homeCustomer');
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        $location.path('/');
    };
});*/


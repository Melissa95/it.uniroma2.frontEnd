
app.controller('ctrlSignIn', function($scope,$http) {

  console.log("sono nel controller");

  $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

  $scope.register = function() {

      console.log("sono in register");

      var url = "http://localhost:8200/ticketingsystem/user";


      $http ({
          method: 'POST',
          url: url,
          dataType: 'json',
          data: {
              name: $scope.name,
              surname: $scope.surname,
              username: $scope.username,
              password: $scope.password,
              email: $scope.email,
              "role": "customer"
          },
          headers: {'Content-Type': 'application/json; charset=UTF-8'}


      }).then(function (response) {

         if (response.status === 201) alert("Registration success");

      }).catch(function() {

          //attivata se username è gia presente
          alert("Error in registration");
      });



  }

});
/*
app.controller('ctrlSignIn', function ($uibModal, $log, $document) {
    var $ctrl = this;

    $ctrl.animationsEnabled =false;

    console.log("In ctrl sign111");

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

app.controller('ModalInstanceCtrl', function ($uibModalInstance, $location) {
    var $ctrl = this;
    console.log("In ctrl sign");

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


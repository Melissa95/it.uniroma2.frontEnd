app.controller('ctrlTicket',['$scope','$http','$sessionStorage','$location', '$uibModal','$log','$mdDialog',function($scope,$http,$sessionStorage,$location,$uibModal, $log,$mdDialog) {

    $scope.priority = ["1","2","3","4","5"];
    $scope.targ;


    /*$scope.showDetails = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'modal-form.html',
            controller: ModalInstanceCtrl,
            scope: $scope,
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                }
            }

        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            //codice
        });
    };*/


    $scope.showDetails = function() {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'html/dialog1.tmpl.html',
            parent: angular.element(document.body),
            //targetEvent: ev,
            clickOutsideToClose:true


        })
            .then(function(answer) {

                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }




    $scope.createTick=function () {

        var url = "http://localhost:8200/ticketingsystem/ticket";

        var date = new Date();
        console.log("in creation ticket "+ $scope.customerPriority + "" + $scope.target);
        console.log("in creation ticket "+ date.getDate() +"/" + date.getMonth() + "/" + date.getFullYear());


        $http ({
            method: 'POST',
            url: url,
            dataType: 'json',
            data: {
                title: $scope.title,
                category: $scope.category,
                target: {id: $scope.target},
                description: $scope.description,
                customerPriority: $scope.customerPriority,
                customer: { username: $sessionStorage.user.username},
                "status": "new",
                "dateStart":date.getDate() +"/" + date.getMonth() + "/" + date.getFullYear()
            },
            headers: {'Content-Type': 'application/json; charset=UTF-8'}


        }).then(function (response) {

            if (response.status === 201) $location.path("/showMyTicket");

        }).catch(function() {

            alert("Error in ticket's creation");
        });


    };

    $scope.showAllTickets = function () {

        console.log("sono in showAllTickets " );

        var url = "http://localhost:8200/ticketingsystem/ticket";

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

    };
    console.log("sono dopo show All ticket");

    $scope.showAllTickets();

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

            $scope.targ = response.data;
            console.log(response.data);
            $scope.resultNegative=true;



        }).catch(function() {
            $scope.resultNegative=false;
            $scope.result=true;

        });

    };
    console.log("sono dopo show product");

    $scope.showProducts();

    $scope.showDependency = function (index) {
        console.log("sono nel dep");
        if(document.getElementById(index).style.display === 'none') {
            document.getElementById(index).style.display = 'block';
        }else{
            document.getElementById(index).style.display = 'none';
        }


    }


}]);


/*var ModalInstanceCtrl = function ($scope, $uibModalInstance, userForm) {
    $scope.form = {};
    $scope.submitForm = function () {
        if ($scope.form.userForm.$valid) {
            console.log('Premuto OK');
            //codice
            $uibModalInstance.close('closed');
        }
    };

    $scope.cancel = function () {
        console.log('Premuto Cancel')
        //codice
        $uibModalInstance.dismiss('cancel');
    };
};*/


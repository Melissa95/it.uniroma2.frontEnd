app.controller('ctrlTicket',['$scope','myService','$sessionStorage','$location', '$uibModal','$log','$mdDialog','myAjax',function($scope,myService,$sessionStorage,$location,$uibModal, $log,$mdDialog,myAjax) {


    $scope.priority = ["1","2","3","4","5"];
    $scope.targ = null;

    var idTick;

    $scope.ticket = null;
    $scope.relTicket=null;
    $scope.relationName=null;


    $scope.showDetails = function(param) {
        idTick = param;
        myService.dataObj = {"id": idTick};
        $mdDialog.show({
            controller: "DialogController",
            templateUrl: 'html/dialog1.tmpl.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true

        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };




    $scope.createTick=function () {

        var date = new Date();


        var init = function () {
            var param = {
                title: $scope.title,
                category: $scope.category,
                target: {id: $scope.target},
                description: $scope.description,
                customerPriority: $scope.customerPriority,
                customer: { username: $sessionStorage.user.username},
                "status": "new",
                "dateStart":date.getDate() +"/" + date.getMonth() + "/" + date.getFullYear()
            };
            myAjax.createTicket(param).then(function (response) {

                //$scope.items = data;
                if (response.status === 201) $location.path("/showMyTicket");

            }, function () {

                alert("Error in ticket's creation");
            });
        };

        init();



    };

    $scope.showAllTickets = function () {

        var param = {};

        var init = function () {

            myAjax.getTickets(param).then(function (response) {

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

    $scope.showAllTickets();

    $scope.showProducts = function () {


        var param = {};

        var init = function () {

            myAjax.getTargets(param).then(function (response) {

                if (response.status === 200) {
                    $scope.targ = response.data;
                    $scope.result = false;

                    //$scope.records = response.data;
                    console.log("id"+$scope.targ.id);


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



}]);


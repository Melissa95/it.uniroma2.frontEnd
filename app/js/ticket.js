app.controller('ctrlTicket',['$scope','myService','$http','$sessionStorage','$location', '$uibModal','$log','$mdDialog',function($scope,myService,$http,$sessionStorage,$location,$uibModal, $log,$mdDialog) {


    $scope.priority = ["1","2","3","4","5"];
    $scope.targ;

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

        var url = "http://localhost:8200/ticketingsystem/ticket";

        var date = new Date();

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


        var url = "http://localhost:8200/ticketingsystem/ticket";


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

    $scope.showAllTickets();

    $scope.showProducts = function () {


        var url = "http://localhost:8200/ticketingsystem/target";


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
            $scope.resultNegative=true;



        }).catch(function() {
            $scope.resultNegative=false;
            $scope.result=true;

        });

    };

    $scope.showProducts();

    /*$scope.showDependency = function (index) {
        console.log("sono nel dep");
        if(document.getElementById(index).style.display === 'none') {
            document.getElementById(index).style.display = 'block';
        }else{
            document.getElementById(index).style.display = 'none';
        }


    }*/


}]);


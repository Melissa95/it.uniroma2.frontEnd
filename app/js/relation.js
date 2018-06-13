
app.controller('ctrlRelation', function( $scope, $http, $location) {

        //ticket NEW & having no relations
        $scope.ticketsNoRel = null;
        //ticket already having a dependency
        $scope.ticketsDep = null;
        //tickets available for dependency
        $scope.ticketsforDep=null;
        //tickets available for equality
        $scope.ticketsforEqu=null;
        //tickets available for regression
        $scope.ticketsforReg=null;

        $scope.allRelation=null;
        $scope.allTick=null;




       $scope.rel = ["equality","dependency","regression"];


         $scope.getAllRelation = function() {


            var url = "http://localhost:8200/ticketingsystem/relation";


            $http ({
                method: 'GET',
                url: url,
                dataType: 'json',
                headers: {'Content-Type': 'charset=UTF-8'}


            }).then(function (response) {

                if (response.status === 200)
                    $scope.allRelation =  response.data;


            }).catch(function() {

                alert("Error getting relations 1");
            });



        };


         $scope.getAllRelation();

        //returns tickets NEW & having no relations
        $scope.getTicket = function() {


        var url = "http://localhost:8200/ticketingsystem/ticket/findTicketNoRelation";


        $http ({
            method: 'GET',
            url: url,
            dataType: 'json',
            headers: {'Content-Type': 'charset=UTF-8'}


        }).then(function (response) {

            if (response.status === 200)
                $scope.ticketsNoRel =  response.data;
                /*$scope.tickets =  $scope.tickets  || [
                   response

                ];*/

        }).catch(function() {

            //attivata se username è gia presente
            alert("Error getting tickets");
        });



    };

    $scope.getTicket();



    //returns ticket already having a dependency
    $scope.getTicketDep = function() {

        var url = "http://localhost:8200/ticketingsystem/ticket/findTicketDependency";


        $http ({
            method: 'GET',
            url: url,
            dataType: 'json',
            headers: {'Content-Type': 'charset=UTF-8'}


        }).then(function (response) {

            if (response.status === 200)
                $scope.ticketsDep =  response.data;
            /*$scope.tickets =  $scope.tickets  || [
               response

            ];*/

        }).catch(function() {

            //attivata se username è gia presente
            alert("Error getting tickets");
        });



    };

    $scope.getTicketDep();



    //returns tickets available for dependency
    $scope.getTicketForDependency = function() {


        var url = "http://localhost:8200/ticketingsystem/ticket/findTicketForCreateDependency";


        $http ({
            method: 'GET',
            url: url,
            dataType: 'json',
            headers: {'Content-Type': 'charset=UTF-8'}


        }).then(function (response) {

            if (response.status === 200)
                $scope.ticketsforDep =  response.data;
            /*$scope.tickets =  $scope.tickets  || [
               response

            ];*/

        }).catch(function() {

            //attivata se username è gia presente
            alert("Error getting tickets");
        });



    };

    //returns tickets available for regression
    $scope.getTicketForRegression = function() {


        var url = "http://localhost:8200/ticketingsystem/ticket/findTicketForCreateRegression";


        $http ({
            method: 'GET',
            url: url,
            dataType: 'json',
            headers: {'Content-Type': 'charset=UTF-8'}


        }).then(function (response) {

            if (response.status === 200)
                $scope.ticketsforReg =  response.data;
            /*$scope.tickets =  $scope.tickets  || [
               response

            ];*/

        }).catch(function() {

            //attivata se username è gia presente
            alert("Error getting tickets");
        });



    };

    //returns tickets available for equality
    $scope.getTicketForEquality = function() {


        var url = "http://localhost:8200/ticketingsystem/ticket/findTicketForCreateEquality";


        $http ({
            method: 'GET',
            url: url,
            dataType: 'json',
            headers: {'Content-Type': 'charset=UTF-8'}


        }).then(function (response) {

            if (response.status === 200)
                $scope.ticketsforEqu =  response.data;
            /*$scope.tickets =  $scope.tickets  || [
               response

            ];*/

        }).catch(function() {

            //attivata se username è gia presente
            alert("Error getting tickets");
        });



    };

    $scope.getTicketForDependency();
    $scope.getTicketForEquality();
    $scope.getTicketForRegression();




    $scope.valueRelation = function (param) {
        console.log("dati..." + param);
        $scope.relation = param;
    };

    $scope.idTicket = function (id) {
        console.log("dati..." + id);
        $scope.idChoose = id;
    };

    $scope.createRel = function (index,id) {

        var choosen;
        if (index != null) {
            choosen = $scope.ticketsNoRel[index].id;
        }else if (id != null) {
            choosen = id;
        }
        if ($scope.relation==='equality') {

            console.log("sono nell'if equality");

            var url = "http://localhost:8200/ticketingsystem/ticket/" + choosen;


            $http ({
                method: 'PUT',
                url: url,
                data: {
                    sameTicket: { id: $scope.idChoose}
                },
                dataType: 'json',
                headers: {'Content-Type': 'application/json; charset=UTF-8'}



            }).then(function (response) {

                if (response.status === 200) {
                    alert("Relation correctly created!");
                    $location.path("/homeCustomer");
                }



            }).catch(function() {

                //attivata se username è gia presente
                alert("Creation failed!");
            });

        }else if ($scope.relation=== 'dependency') {

            console.log("sono nell'if dependency");

            var url = "http://localhost:8200/ticketingsystem/ticket/addDependentTicket/"
                + $scope.idChoose + "/" + choosen;


            $http ({
                method: 'POST',
                url: url


            }).then(function (response) {

                if (response.status === 200){
                    alert("Relation correctly created!");
                    $location.path("/homeCustomer");
                }

            }).catch(function(response) {

                if (response.status === 424){
                    alert("Creation failed!");
                }

            });

        } else if ($scope.relation==='regression') {

            console.log("sono nell'if regression");

            var url = "http://localhost:8200/ticketingsystem/ticket/addRegression/"
                + choosen + "/" + $scope.idChoose;


            $http({
                method: 'POST',
                url: url,
                data: {},

                headers: {'Content-Type': 'application/json; charset=UTF-8'}


            }).then(function (response) {

                if (response.status === 200) {
                    alert("Relation correctly created!");
                    $location.path("/homeCustomer");
                }

            }).catch(function () {

                alert("Creation failed!");
            });

        } else if ($scope.relation !== null && $scope.relation !== 'equality' && $scope.relation !== 'regression' && $scope.relation !== 'dependency') {


                var url = "http://localhost:8200/ticketingsystem/relationInstance/" + $scope.relation +"/" + choosen + "/" + $scope.idChoose;


                $http ({
                    method: 'POST',
                    url: url,
                    data: {
                        relation: {
                            name: $scope.relation
                        },
                        fatherTicket: {
                            id: choosen
                        },
                        sonTicket: {
                            id: $scope.idChoose
                        }

                    },
                    dataType: 'json',
                    headers: {'Content-Type': 'application/json; charset=UTF-8'}



                }).then(function (response) {

                    if (response.status === 201) {
                        alert("Relation correctly created!");
                        $location.path("/homeCustomer");
                    }



                }).catch(function() {

                    //attivata se username è gia presente
                    alert("Creation failed!");
                });

            }
    };

    $scope.createRelDep = function (index) {
        console.log("dati" + " " +  "dependency" +  " " + $scope.idChoose + " " + $scope.ticketsDep[index].id );

        var url = "http://localhost:8200/ticketingsystem/ticket/addDependentTicket/"
            + $scope.idChoose + "/" + $scope.ticketsDep[index].id;


        $http ({
            method: 'POST',
            url: url


        }).then(function (response) {

            if (response.status === 200){
                alert("Relation correctly created!");
                $location.path("/homeCustomer");
            }

        }).catch(function(response) {

            if (response.status === 424){
                alert("Creation failed!");
            }

        });

    };

    //returns all tickets
    $scope.allTickets = function () {


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

            if (response.status === 200)
                $scope.allTick = response.data;


        }).catch(function() {
            alert("Creation failed!");

        });

    };

    $scope.allTickets();


});
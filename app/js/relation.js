

app.controller('ctrlRelation', function( $scope, $http) {

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



       $scope.rel = ["equality","dependency","regression"];



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


        var url = "http://localhost:8200/ticketingsystem/ticket/findTicketForCreateUguality";


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


    $scope.valueRelation = function (param) {
        console.log("dati..." + param);
        $scope.relation = param;
    };

    $scope.idTicket = function (id) {
        console.log("dati..." + id);
        $scope.idChoose = id;
    };

    $scope.createRel = function (index) {
        console.log("dati" + " " +  $scope.relation +  " " + $scope.idChoose + " " + $scope.ticketsNoRel[index].id );

        if ($scope.relation === 'equality') {

            var url = "http://localhost:8200/ticketingsystem/ticket/" + ID;


            $http ({
                method: 'PUT',
                url: url,
                data: {

                },
                dataType: 'json',
                headers: {'Content-Type': 'charset=UTF-8'}


            }).then(function (response) {

                /*
                if (response.status === 2)
                    $scope.ticketsforReg =  response.data;
                /*$scope.tickets =  $scope.tickets  || [
                   response

                ];*/

            }).catch(function() {

                //attivata se username è gia presente
                alert("Impossible create equality");
            });

        }else if ($scope.relation === 'dependency') {

            var url = "http://localhost:8200/ticketingsystem/ticket/addDependentTicket/" + ID + dependentTicketID;


            $http ({
                method: 'POST',
                url: url,
                data: {

                },
                dataType: 'json',
                headers: {'Content-Type': 'charset=UTF-8'}


            }).then(function (response) {

                /*
                if (response.status === 2)
                    $scope.ticketsforReg =  response.data;
                /*$scope.tickets =  $scope.tickets  || [
                   response

                ];*/

            }).catch(function() {

                //attivata se username è gia presente
                alert("Impossible create dependency");
            });

        } else if ($scope.relation === 'regression') {

        var url = "http://localhost:8200/ticketingsystem/ticket/addDependentTicket/addRegression" + ID + idGenerator;


        $http ({
            method: 'POST',
            url: url,
            data: {

            },
            dataType: 'json',
            headers: {'Content-Type': 'charset=UTF-8'}


        }).then(function (response) {

            /*
            if (response.status === 2)
                $scope.ticketsforReg =  response.data;
            /*$scope.tickets =  $scope.tickets  || [
               response

            ];*/

        }).catch(function() {

            //attivata se username è gia presente
            alert("Impossible create regression");
        });

    }
    };

    $scope.createRelDep = function (index) {
        console.log("dati" + " " +  "dependency" +  " " + $scope.idChoose + " " + $scope.ticketsDep[index].id );
    };


});
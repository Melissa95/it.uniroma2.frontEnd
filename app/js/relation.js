

app.controller('ctrlRelation', function( $scope, $http) {
        $scope.ticket= null;
        $scope.ticketsNoRel = null;
        $scope.ticketsDep = null;
        $scope.ticketsforDep=null;
        $scope.ticketsforEqu=null;
        $scope.ticketsforReg=null;



       $scope.rel = ["equality","dependency","regression"];




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

    $scope.getTicketForDependency = function() {

        console.log("in getDEP");

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

    $scope.getTicketForEquality = function() {


        var url = "http://localhost:8200/ticketingsystem/ticket/findTicketForCreateUguality";
        console.log("IN FUNCTION EQUALITY");

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

    $scope.getTicketForDependency();
    $scope.getTicketForEquality();
    $scope.getTicketForRegression();


    $scope.getTicketDep = function() {


        var url = "http://localhost:8200/ticketingsystem/ticket/findTicketDependency";
        console.log("IN FUNCTION EQUALITY");

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
    };

    $scope.createRelDep = function (index) {
        console.log("dati" + " " +  "dependency" +  " " + $scope.idChoose + " " + $scope.ticketsDep[index].id );
    };


});
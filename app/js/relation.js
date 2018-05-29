
app.controller('ctrlRelation', function( $scope, $http) {
        $scope.ticket= null;
        $scope.ticketsNoRel = null;
        $scope.ticketsDep = null;
        $scope.ticketsforDep=null;
        $scope.ticketsforEqu=null;
        $scope.ticketsforReg=null;


        $scope.getTicket = function() {

        console.log("in get");

        var url = "http://localhost:8200/ticketingsystem/ticket/findAllTicketsByStatusNot/new";


        $http ({
            method: 'GET',
            url: url,
            dataType: 'json',
            headers: {'Content-Type': 'charset=UTF-8'}


        }).then(function (response) {

            if (response.status === 201)
                $scope.ticketsNoRel =  response.data;
                /*$scope.tickets =  $scope.tickets  || [
                   response

                ];*/

        }).catch(function() {

            //attivata se username è gia presente
            alert("Error getting tickets");
        });



    }

    $scope.getTicket();




    });
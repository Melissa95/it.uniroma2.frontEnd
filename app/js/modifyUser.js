
app.controller('ctrlModifyUser', function($scope,$http) {

    $scope.result = true;
    $scope.resultNegative = true;


    $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.modifyUser = function() {

        console.log("sono in  modify User");

        var url = "http://localhost:8200/ticketingsystem/user/"+$scope.username;


        $http ({
            method: 'PUT',
            url: url,
            dataType: 'json',
            data: {
                name: $scope.name,
                surname: $scope.surname,
                username: $scope.username,
                password: $scope.password,
                //email: $scope.email,
                "role": "customer"
            },
            headers: {'Content-Type': 'application/json; charset=UTF-8'}


        }).then(function (response) {

            if (response.status === 200)
                $scope.result=false;
                $scope.name="";
                $scope.surname="";
                $scope.username="";
                $scope.password="";
                $scope.resultNegative=true;

        }).catch(function() {

            //attivata se username non è presente nel sistema
            $scope.result=true;
            $scope.name="";
            $scope.surname="";
            $scope.username="";
            $scope.password="";
            $scope.resultNegative=false;

    });



    }

});
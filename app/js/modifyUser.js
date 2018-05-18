
app.controller('ctrlModifyUser', function($scope,$http) {


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
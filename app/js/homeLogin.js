
app.controller('ctrlLogin', function($scope,$http,$location) {

    $scope.login = function() {
//inviare sia username che password

        console.log("nel login" + $scope.username);
        console.log($scope.password);
        var url = "http://localhost:8200/ticketingsystem/user/login";

        $http ({
            method: 'POST',
            url: url,
            dataType: 'json',
            data: {

                username: $scope.username,
                password: $scope.password

            },
            headers: {'Content-Type': 'application/json; charset=UTF-8'}

        }).then(function (response) {

            if (response.status === 200) {
                alert( "login");
                $scope.log = 1
                $location.path('/homeCustomer');
            }



        }).catch(function(response) {

            //username ok, password wrong
            if (response.status === 302) {
                alert("Password wrong");
            }
            //username wrong
            if (response.status === 404) {
                alert("Username wrong");
            }

        });

    }

});
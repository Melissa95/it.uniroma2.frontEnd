
app.controller('ctrlModifyUser', function($scope,myAjax,$sessionStorage,$location) {

    $scope.result = true;
    $scope.resultNegative = true;


    $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

    $scope.modifyUser = function() {

        console.log("sono in  modify User" + $sessionStorage.user.username);


        var init = function () {
            var param = {
                name: $scope.name,
                surname: $scope.surname,
                username: $sessionStorage.user.username,
                password: $scope.password,
                //email: $scope.email,
                "role": "customer"
            };
            myAjax.modifyUser(param).then(function (response) {

                //$scope.items = data;
                if (response.status === 200) {
                    $scope.name = "";
                    $scope.surname = "";
                    $scope.username = "";
                    $scope.password = "";
                    $sessionStorage.user = response.data;
                    console.log("response" + response.data.name);
                    alert("Success in modify");
                    $location.path("/homeCustomer");
                }


            }, function () {

                //attivata se username non è presente nel sistema
                $scope.name = "";
                $scope.surname = "";
                $scope.username = "";
                $scope.password = "";
                alert("Error in modify");
            });
        };

        init();

    }

});
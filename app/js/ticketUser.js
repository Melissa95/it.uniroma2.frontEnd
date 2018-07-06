app.controller('ctrlUserTicket', function($scope,myAjax,$location, $sessionStorage) {


    $scope.ShowMyTickets = function () {

        console.log("sono in showMyTickets ");


        var init = function () {
            var param = {
                username: $sessionStorage.user.username,
            };
            myAjax.myTickets(param).then(function (response) {

                //$scope.items = data;
                if (response.status === 200) {
                    $scope.result = false;

                    $scope.records = response.data;
                    console.log(response.data);


                    $scope.resultNegative = true;

                }
            }, function () {

                $scope.resultNegative = false;

                $scope.result = true;
            });
        };

        init();

    };

    $scope.ShowMyTickets();

});

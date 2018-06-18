app.controller('ctrlNewRelation', function($scope, $http, $location) {


    $scope.cyclic = false;

    $scope.createNewRel = function() {
        var url = "http://localhost:8200/ticketingsystem/relation/" + $scope.name;


        $http({
            method: 'POST',
            url: url,
            dataType: 'json',
            data: {
                name: $scope.name,
                cyclic: $scope.cyclic

            },
            headers: {'Content-Type': 'application/json; charset=UTF-8'}


        }).then(function (response) {

            if (response.status === 201) {
                alert("relation created with success");
                $location.path("/relation");
            }

        }).catch(function (response) {
            if (response.status === 302) {
                alert("Error in relation's creation");
                $location.path("/defineNewRelation");
            }
        });

    }

});

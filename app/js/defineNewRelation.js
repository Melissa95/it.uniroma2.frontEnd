app.controller('ctrlNewRelation', function($scope, $http) {


    $scope.cyclic = false;

    $scope.createNewRel = function() {
        var url = "http://localhost:8200/ticketingsystem/relation";


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

            if (response.status === 201) alert("relation created with success")

        }).catch(function () {

            alert("Error in relation's creation");
        });

    }

});

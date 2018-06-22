app.controller('ctrlNewRelation', function($scope, myAjax, $location) {


    $scope.cyclic = false;

    $scope.createNewRel = function() {


        var init = function () {
            var param = {
                name: $scope.name,
                cyclic: $scope.cyclic
            };
            myAjax.newRelation(param).then(function (response) {

                if (response.status === 201) {
                    alert("relation created with success");
                    $location.path("/relation");
                }


            }, function (err) {

                if (err.status === 302) {
                    alert("Error in relation's creation");
                    $location.path("/defineNewRelation");
                }
            });
        };

        init();

    }

});

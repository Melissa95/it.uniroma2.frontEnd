
app.controller('ctrlRelation', function($timeout, $scope) {
        $scope.user = null;
        $scope.users = null;




        $scope.users =  $scope.users  || [
                    { id: 1, name: 'Scooby Doo' },
                    { id: 2, name: 'Shaggy Rodgers' },
                    { id: 3, name: 'Fred Jones' },
                    { id: 4, name: 'Daphne Blake' },
                    { id: 5, name: 'Velma Dinkley' }

                    ];



    });
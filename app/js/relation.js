
app.controller('ctrlRelation', function( $scope, myAjax, $location,$mdDialog) {


        //tickets available for dependency
        $scope.ticketsforDep=null;
        //tickets available for equality
        $scope.ticketsforEqu=null;
        //tickets available for regression
        $scope.ticketsforReg=null;

        $scope.allRelation=null;
        $scope.allTick=null;
        $scope.relations = {};




       $scope.rel = ["equality","dependency","regression"];


         $scope.getAllRelation = function() {

             var init = function () {
                 var param = {};

                 myAjax.getAllRel(param).then(function (response) {

                     if (response.status === 200)
                         $scope.allRelation =  response.data;

                 }, function () {


                     $mdDialog.show(
                         $mdDialog.alert()
                             .parent(angular.element(document.querySelector('#popupContainer')))
                             .clickOutsideToClose(true)
                             .title('Operation failed')
                             .textContent("Error getting relations")
                             .ariaLabel('Alert Dialog Demo')
                             .ok('Ok')
                             .targetEvent()
                     );
                 });
             };

             init();



        };


         $scope.getAllRelation();


    //returns tickets available for dependency
    $scope.getTicketForDependency = function() {


        var init = function () {
            var param = {};

            myAjax.getTicketForDep(param).then(function (response) {

                //$scope.items = data;
                if (response.status === 200)
                    $scope.ticketsforDep =  response.data;

            }, function () {


                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Operation failed')
                        .textContent("Error getting tickets")
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')
                        .targetEvent()
                );
            });
        };

        init();


    };

    //returns tickets available for regression
    $scope.getTicketForRegression = function() {


        var init = function () {
            var param = {};

            myAjax.getTicketForReg(param).then(function (response) {

                //$scope.items = data;
                if (response.status === 200)
                    $scope.ticketsforReg =  response.data;

            }, function () {


                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Operation failed')
                        .textContent("Error getting tickets")
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')
                        .targetEvent()
                );
            });
        };

        init();

    };

    //returns tickets available for equality
    $scope.getTicketForEquality = function() {



        var init = function () {
            var param = {};

            myAjax.getTicketForEqual(param).then(function (response) {

                if (response.status === 200)
                    $scope.ticketsforEqu =  response.data;

            }, function () {


                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Operation failed')
                        .textContent("Error getting tickets")
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')
                        .targetEvent()
                );
            });
        };

        init();



    };

    $scope.getTicketForDependency();
    $scope.getTicketForEquality();
    $scope.getTicketForRegression();




    $scope.valueRelation = function (name, ticketId) {
        console.log("dati..." + name);
        $scope.relations[ticketId] = name;
    };

    $scope.idTicket = function (id) {
        console.log("dati..." + id);
        $scope.idChoose = id;
    };

    $scope.createRel = function (index,id) {

        var choosenTable;
        if (index != null) {
            choosenTable = $scope.allTick[index].id;
        }else if (id != null) {
            choosenTable = id;
        }
        if ($scope.relations[choosenTable]==='equality') {


            var init = function () {
                var param = {
                    sameTicket: { id: $scope.idChoose}
                };
                myAjax.putRelationEqual(param,choosenTable).then(function (response) {

                    if (response.status === 200) {

                        var confirm = $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Operation success')
                                .textContent("Relation correctly created!")
                                .ariaLabel('Alert Dialog Demo')
                                .multiple(true)
                                .ok('Ok')
                                .targetEvent()

                        $mdDialog.show(confirm).then(function () {
                            if (index != null) {
                                $location.path("/showAllTickets");
                            }
                            }, function () {
                                console.log("error");
                            }
                        );


                        /*var confirm = $mdDialog.confirm()
                            .title('Operation success')
                            .textContent('Relation correctly created!')
                            .ariaLabel('Lucky day')
                            .targetEvent()
                            .multiple(true)
                            .ok('Ok');

                        /*$mdDialog.show(confirm).then(function() {
                            $location.path("/showAllTickets");
                        }, function() {
                        });*/




                    }


                }, function (err) {

                    if (err.status === 401) {

                       // $location.path("/relation");



                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Operation failed')
                                .textContent("Cannot create equality with the same ticket")
                                .ariaLabel('Alert Dialog Demo')
                                .multiple(true)
                                .ok('Ok')
                                .targetEvent()
                        );
                    } else {

                        //$location.path("/relation");

                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Operation failed')
                                .textContent("Error in creation")
                                .ariaLabel('Alert Dialog Demo')
                                .multiple(true)
                                .ok('Ok')
                                .targetEvent()
                        );
                    }
                });
            };

            init();

        }else if ($scope.relations[choosenTable]=== 'dependency') {


            var init = function () {
                var param = {};
                myAjax.putRelationDep(param,choosenTable,$scope.idChoose).then(function (response) {

                    if (response.status === 200){

                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Operation success')
                                .textContent("Relation correctly created!")
                                .ariaLabel('Alert Dialog Demo')
                                .multiple(true)
                                .ok('Ok')
                                .targetEvent()
                        );

                        /*$mdDialog.show()
                        {
                            var resp = $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Operation success')
                                .textContent('Relation correctly created!')
                                .ariaLabel('Alert Dialog Demo')
                                .multiple(true)
                                .ok('Ok')
                                .targetEvent();

                            /*$mdDialog.show(resp).then(function () {
                                $location.path("/showAllTickets");
                            }, function () {
                                console.log("error");

                            });
                        };*/
                    }


                }, function (err) {

                    if (err.status === 424) {
                        if (err.data.length === 0) {
                            //$location.path("/relation");

                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Operation failed')
                                    .textContent("Reflective relation is forbidden")
                                    .ariaLabel('Alert Dialog Demo')
                                    .multiple(true)
                                    .ok('Ok')
                                    .targetEvent()
                            );


                        } else {
                            var cicle = "" + err.data[0].id;
                            for (var i = 1; i < err.data.length; i++) {
                                cicle += ", " + err.data[i].id;
                            }
                            //$location.path("/relation");

                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Operation failed')
                                    .textContent("Creation failed due to this cycle: " + cicle)
                                    .ariaLabel('Alert Dialog Demo')
                                    .multiple(true)
                                    .ok('Ok')
                                    .targetEvent()
                            );


                        }
                    }
                });
            };

            init();

        } else if ($scope.relations[choosenTable]==='regression') {



            var init = function () {
                var param = {};
                myAjax.putRelationRegression(param,choosenTable,$scope.idChoose).then(function (response) {

                    if (response.status === 200) {

                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Operation success')
                                .textContent("Relation correctly created!")
                                .ariaLabel('Alert Dialog Demo')
                                .multiple(true)
                                .ok('Ok')
                                .targetEvent()
                        );

                        /*$mdDialog.show()
                        {
                            var resp = $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Operation success')
                                .textContent('Relation correctly created!')
                                .ariaLabel('Alert Dialog Demo')
                                .multiple(true)
                                .ok('Ok')
                                .targetEvent();

                            /*$mdDialog.show(resp).then(function () {
                                $location.path("/showAllTickets");
                            }, function () {
                                console.log("error");

                            });
                        };*/
                    }


                }, function (err) {

                    if (err.status === 424) {

                        //$location.path("/relation");

                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Operation failed')
                                .textContent("cannot create regression with the same ticket ")
                                .ariaLabel('Alert Dialog Demo')
                                .multiple(true)
                                .ok('Ok')
                                .targetEvent()
                        );


                    }
                });
            };

            init();

        } else if ($scope.relations[choosenTable] !== null && $scope.relations[choosenTable] !== 'equality' && $scope.relations[choosenTable] !== 'regression' && $scope.relations[choosenTable] !== 'dependency') {



            var init = function () {
                var param = {
                    relation: {
                        name: $scope.relations[choosenTable]
                    },
                    fatherTicket: {
                        id: choosenTable
                    },
                    sonTicket: {
                        id: $scope.idChoose
                    }
                };
                myAjax.putRelationCustom(param).then(function (response) {

                    if (response.status === 201) {

                        $mdDialog.show(
                            $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Operation success')
                                .textContent("Relation correctly created!")
                                .ariaLabel('Alert Dialog Demo')
                                .multiple(true)
                                .ok('Ok')
                                .targetEvent()
                        );

                        /*$mdDialog.show()
                        {
                            var resp = $mdDialog.alert()
                                .parent(angular.element(document.querySelector('#popupContainer')))
                                .clickOutsideToClose(true)
                                .title('Operation success')
                                .textContent('Relation correctly created!')
                                .ariaLabel('Alert Dialog Demo')
                                .multiple(true)
                                .ok('Ok')
                                .targetEvent();

                            /*$mdDialog.show(resp).then(function () {
                                $location.path("/showAllTickets");
                            }, function () {
                                console.log("error");

                            });
                        };*/
                    }

                }, function (err) {

                    if (err.status === 424) {
                        if (err.data.length === 0) {
                            //$location.path("/showAllTickets");

                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Operation failed')
                                    .textContent("Reflective relation is forbidden")
                                    .ariaLabel('Alert Dialog Demo')
                                    .multiple(true)
                                    .ok('Ok')
                                    .targetEvent()
                            );
                        } else {
                            var cicle = "" + err.data[0].id;
                            for (var i = 1; i < err.data.length; i++) {
                                cicle += ", " + err.data[i].id;
                            }
                            //$location.path("/showAllTickets");
                            $mdDialog.show(
                                $mdDialog.alert()
                                    .parent(angular.element(document.querySelector('#popupContainer')))
                                    .clickOutsideToClose(true)
                                    .title('Operation failed')
                                    .textContent("Creation failed due to this cycle: " + cicle)
                                    .ariaLabel('Alert Dialog Demo')
                                    .multiple(true)
                                    .ok('Ok')
                                    .targetEvent()
                            );

                        }
                    }
                });
            };

            init();

            }
    };


    //returns all tickets
    $scope.allTickets = function () {


        var param = {};

        var init = function () {

            myAjax.getTickets(param).then(function (response) {

                if (response.status === 200) {

                    $scope.allTick = response.data;

                }
            }, function () {

                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Operation failed')
                        .textContent("Error in get tickets")
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Ok')
                        .targetEvent()
                );
            });
        };

        init();
    };

    $scope.allTickets();


});
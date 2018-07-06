
app.controller('ctrlRelation', function( $scope, myAjax, $location) {


        //tickets available for dependency
        $scope.ticketsforDep=null;
        //tickets available for equality
        $scope.ticketsforEqu=null;
        //tickets available for regression
        $scope.ticketsforReg=null;

        $scope.allRelation=null;
        $scope.allTick=null;




       $scope.rel = ["equality","dependency","regression"];


         $scope.getAllRelation = function() {

             var init = function () {
                 var param = {};

                 myAjax.getAllRel(param).then(function (response) {

                     //$scope.items = data;
                     if (response.status === 200)
                         $scope.allRelation =  response.data;

                 }, function () {

                     alert("Error getting relations ");
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
                    console.log("ticket" + response.data[0].id);
                    $scope.ticketsforDep =  response.data;

            }, function () {

                alert("Error getting tickets");
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

                alert("Error getting tickets");
            });
        };

        init();

    };

    //returns tickets available for equality
    $scope.getTicketForEquality = function() {



        var init = function () {
            var param = {};

            myAjax.getTicketForEqual(param).then(function (response) {

                //$scope.items = data;
                if (response.status === 200)
                    $scope.ticketsforEqu =  response.data;

            }, function () {

                alert("Error getting tickets");
            });
        };

        init();



    };

    $scope.getTicketForDependency();
    $scope.getTicketForEquality();
    $scope.getTicketForRegression();




    $scope.valueRelation = function (param) {
        console.log("dati..." + param);
        $scope.relation = param;
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
        if ($scope.relation==='equality') {


            var init = function () {
                var param = {
                    sameTicket: { id: $scope.idChoose}
                };
                myAjax.putRelationEqual(param,choosenTable).then(function (response) {

                    if (response.status === 200) {
                        alert("Relation correctly created!");
                        $location.path("/showAllTickets");
                    }


                }, function (err) {

                    if (err.status === 401) {
                        alert("Creation failed: cannot create equality with the same ticket");
                        $location.path("/relation");
                    } else {
                        alert("Creation failed");
                        $location.path("/relation");
                    }
                });
            };

            init();

        }else if ($scope.relation=== 'dependency') {


            var init = function () {
                var param = {};
                myAjax.putRelationDep(param,choosenTable,$scope.idChoose).then(function (response) {

                    if (response.status === 200){
                        alert("Relation correctly created!");
                        $location.path("/showAllTickets");
                    }


                }, function (err) {

                    if (err.status === 424) {
                        if (err.data.length === 0) {
                            alert("Reflective relation is forbidden");
                            $location.path("/relation");
                        } else {
                            var cicle = "" + err.data[0].id;
                            for (var i = 1; i < err.data.length; i++) {
                                cicle += ", " + err.data[i].id;
                            }
                            alert("Creation failed due to this cycle: " + cicle);
                            $location.path("/relation");

                        }
                    }
                });
            };

            init();

        } else if ($scope.relation==='regression') {



            var init = function () {
                var param = {};
                myAjax.putRelationRegression(param,choosenTable,$scope.idChoose).then(function (response) {

                    if (response.status === 200) {
                        alert("Relation correctly created!");
                        $location.path("/showAllTickets");
                    }


                }, function (err) {

                    if (err.status === 424) {
                        alert(" Creation failed: cannot create regression with the same ticket");
                        $location.path("/relation");
                    }
                });
            };

            init();

        } else if ($scope.relation !== null && $scope.relation !== 'equality' && $scope.relation !== 'regression' && $scope.relation !== 'dependency') {



            var init = function () {
                var param = {
                    relation: {
                        name: $scope.relation
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
                        alert("Relation correctly created!");
                        $location.path("/showAllTickets");
                    }

                }, function (err) {

                    if (err.status === 424) {
                        if (err.data.length === 0) {
                            alert("Reflective relation is forbidden");
                            $location.path("/showAllTickets");
                        } else {
                            var cicle = "" + err.data[0].id;
                            for (var i = 1; i < err.data.length; i++) {
                                cicle += ", " + err.data[i].id;
                            }
                            alert("Creation failed due to this cycle: " + cicle);
                            $location.path("/showAllTickets");

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

                alert("error in get tickets");
            });
        };

        init();
    };

    $scope.allTickets();


});
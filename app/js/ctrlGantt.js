'use strict';


app.controller('MainGanttCtrl', function($scope) {

    $scope.tasks = {
        data:[
            {id:1, text:"Ticket", start_date:"01-06-2018", duration:18//,order:10
               },
            {id:2, text:"Task #1",    start_date:"02-06-2018", duration:8//, order:10
               },
            {id:3, text:"Task #2",    start_date:"11-06-2018", duration:8//, order:20
               }
        ]
        };

});
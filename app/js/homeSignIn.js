
var app2 = angular.module('myApp.homeSignIn', ['ngRoute']);

/*
app2.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'html/homeSignIn.html',
    controller: 'View2Ctrl'
  });
}]);
*/
app2.controller('ctrlSignIn', function($scope,$http) {

  console.log("sono nel controller");

  $scope.register = function() {
      /*var param = JSON.stringify({
          name: $scope.name,
          surname: $scope.surname,
          username: $scope.username,
          password: $scope.password,
          email: $scope.email
      });*/

      console.log("sono in register");

      var url = "http://localhost:8200/ticketingsystem/user";

      $http ({
          method:'POST',
          url: url,
          dataType: 'json',
          data: {name: $scope.name,
              surname: $scope.surname,
              username: $scope.username,
              password: $scope.password,
              email: $scope.email,
              "ruolo": "utente"},
          headers: {'Content-Type': 'application/json; charset=UTF-8'}

      }).then(function(data) {
          console.log("success:" + data);
      }, function(data) {
          console.log("error:"+data);
      });

      /*.success(function (data) {
         alert(data);

      }).error(function(data) {
        alert(data);
      });
      */
     /* $http.post(url, param).success(function (data, status, headers, config) {
          console.log(data);
      }).error(function (data, status, headers, config) {
          console.log("error in register");
      });
*/

  }

});

app.controller('ctrlSignIn', function($scope,$http,$location) {

  console.log("sono nel controller");

  $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

  $scope.register = function() {

      console.log("sono in register");

      var url = "http://localhost:8200/ticketingsystem/user";


      $http ({
          method: 'POST',
          url: url,
          dataType: 'json',
          data: {
              name: $scope.name,
              surname: $scope.surname,
              username: $scope.username,
              password: $scope.password,
              email: $scope.email,
              "role": "customer"
          },
          headers: {'Content-Type': 'application/json; charset=UTF-8'}


      }).then(function (response) {

         if (response.status === 201) {
             alert("Registration success");
             $location.path("/homeLogin");
         }

      }).catch(function(response) {
          //attivata se username è gia presente
          if (response.status === 302) {
              alert("Error: Username already exist");
              $location.path("/homeSignIn");
              $scope.username="";
              $scope.password="";
          }else {
              alert("Error in registration");
          }
      });



  }

});

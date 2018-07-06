
app.controller('ctrlSignIn', function($scope,myAjax,$location) {

  $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

  $scope.register = function() {


      var init = function () {
          var param = {
              name: $scope.name,
              surname: $scope.surname,
              username: $scope.username,
              password: $scope.password,
              email: $scope.email,
              "role": "customer"
          };
          myAjax.signInUser(param).then(function(response) {

              //$scope.items = data;
              if (response.status === 201) {
                  alert("Registration success");
                  $location.path("/homeLogin");
              }

          }, function (err) {

              if (err.status === 302) {
                  alert("Error: Username already exist");
                  $location.path("/homeSignIn");
                  $scope.username="";
                  $scope.password="";
              }else {
                  alert("Error in registration");
              }
          });
      };

      init();



  }

});

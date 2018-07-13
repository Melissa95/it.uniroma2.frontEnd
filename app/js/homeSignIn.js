
app.controller('ctrlSignIn', function($scope,myAjax,$location,$mdDialog) {

  $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

  $scope.alertResponse = function(title,msg,newPage) {

      mdDialog.show()
      {
          var resp = $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title(title)
              .textContent(msg)
              .ariaLabel('Alert Dialog Demo')
              .ok('Ok')
              .targetEvent();

          $mdDialog.show(resp).then(function () {
              if(newPage != null) {
                  $location.path(newPage);
              }
          }, function () {
              console.log("error");

          });
      }

  };

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

              if (response.status === 201) {

                  $scope.alertResponse('Operation success','Success in registration',"/homeLogin");

                  /*$mdDialog.show()
                  {
                      var resp = $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .title('Operation success')
                          .textContent('Success in registration')
                          .ariaLabel('Alert Dialog Demo')
                          .ok('Ok')
                          .targetEvent();

                      $mdDialog.show(resp).then(function () {
                          $location.path("/homeLogin");
                      }, function () {
                          console.log("error");

                      });
                  };*/
              }

          }, function (err) {

              if (err.status === 302) {

                  $scope.alertResponse('Operation failed','Username already exist',"/homeSignIn");

                  /*$mdDialog.show()
                  {
                      var resp = $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .title('Operation failed')
                          .textContent('Username already exist')
                          .ariaLabel('Alert Dialog Demo')
                          .ok('Ok')
                          .targetEvent();

                      $mdDialog.show(resp).then(function () {
                          $location.path("/homeSignIn");
                      }, function () {
                          console.log("error");

                      });
                  };*/

                  $scope.username="";
                  $scope.password="";

              }else if(err.status === 500){

                  $scope.alertResponse('Operation failed','Email already exist',null);

                  /*$mdDialog.show(
                      $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .title('Operation failed')
                          .textContent("Email already exist")
                          .ariaLabel('Alert Dialog Demo')
                          .ok('Ok')
                          .targetEvent()
                  );*/

                  $scope.email="";
              }else{

                  $scope.alertResponse('Operation failed','Error in registration',null);

                  /*$mdDialog.show(
                      $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .title('Operation failed')
                          .textContent("Error in registration")
                          .ariaLabel('Alert Dialog Demo')
                          .ok('Ok')
                          .targetEvent()
                  );*/
              }
          });
      };

      init();



  }

});

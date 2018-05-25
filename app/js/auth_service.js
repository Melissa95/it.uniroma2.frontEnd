angular.module('AuthServices', ['ngResource', 'ngStorage'])
    .factory('Auth', function($resource, $rootScope, $sessionStorage,$q){

        /**
         *  User profile resource
         */

        var Profile;

        var auth = {};

        /**
         *  Saves the current user in the root scope
         *  Call this in the app run() method
         */
        auth.init = function(){
            if (auth.isLoggedIn()){
                $rootScope.user = auth.currentUser();
            }
        };

        auth.login = function(username, password){
            console.log('username'+ username);
            console.log('pwd'+ password);

            var url = "http://localhost:8200/ticketingsystem/user/login/"+ username;

            Profile = $resource(url , {}, {
                login: {
                    method: "POST",
                    isArray : false
                }
            });

           //var url = "http://localhost:8200/ticketingsystem/user/login/"+ username;
             return $q(function(resolve, reject){
                Profile.login({username:username, password:password}).$promise
                    .then(function(data) {
                        $sessionStorage.user = data;
                        $rootScope.user = $sessionStorage.user;
                        resolve();
                    }, function() {
                        reject();
                    });
               /* $http ({
                    method: 'POST',
                    url: url,
                    dataType: 'json',
                    data: {

                        username: username,
                        password: password

                    },
                    headers: {'Content-Type': 'application/json; charset=UTF-8'}

                }).then(function (response) {

                    if (response.status === 200) {
                        alert( "login");
                        $sessionStorage.user = response;
                        console.log("dati" + response);
                        $rootScope.user = $sessionStorage.user;
                        $location.path('/homeCustomer');
                        resolve();


                    }



                }).catch(function(response) {

                    //username ok, password wrong
                    if (response.status === 302) {
                        reject();
                        alert("Password wrong");
                    }
                    //username wrong
                    if (response.status === 404) {
                        reject();
                        alert("Username wrong");
                    }

                });*/
            });
        };


        auth.logout = function() {
            delete $sessionStorage.user;
            delete $rootScope.user;
        };


        auth.checkPermissionForView = function(view) {
            if (!view.requiresAuthentication) {
                return true;
            }

            return userHasPermissionForView(view);
        };


        var userHasPermissionForView = function(view){
            if(!auth.isLoggedIn()){
                return false;
            }

            if(!view.permissions || !view.permissions.length){
                return true;
            }

            return auth.userHasPermission(view.permissions);
        };


        auth.userHasPermission = function(permissions){
            if(!auth.isLoggedIn()){
                return false;
            }

            var found = false;
            angular.forEach(permissions, function(permission, index) {
                if ($sessionStorage.user.role.indexOf(permission) >= 0) {
                    found = true;
                    return;
                }
                /*if ($sessionStorage.user.role.equals(permissions[0])){
                    found = true;
                    return;
            }*/
            });
            return found;
        };


        auth.currentUser = function(){
            return $sessionStorage.user;
        };


        auth.isLoggedIn = function(){
            return $sessionStorage.user != null;
        };


        return auth;

 });
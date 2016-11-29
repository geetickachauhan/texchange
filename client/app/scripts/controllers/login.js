'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LoginCtrl', function ($scope, User, $rootScope, $timeout, $location) {
    console.log('In LoginCtrl');
    var userFound = false;
    $scope.loginUser = {

    };
    // need to include some code for banned users
    $scope.loginAttempt = function(){

      // Logs in to DB
      User.login($scope.loginUser).then(function(res){

          var loginLimitReached = false;
          var usernameNotExist = false;

          User.getFromUsername($scope.loginUser.username).then(function(res1){

            console.log("Get from username" + res1.data[0]);
            if(res1.data.length > 0)
            {
              console.log("inside res1.data.length >0");
              $scope.resFromUsername = res1.data[0];
              $scope.loginCount = res1.data[0].loginCount;
              if($scope.loginCount >= 3) // login limit reached
              {
                console.log("Login limit reached");
                loginLimitReached = true;
                $scope.showErrorMessage('Sorry, you may not login. You have 3 failed attempts. Please contact Admin to be able to login');
                return;
              }
            }
            else { //username doesnt exist
              usernameNotExist = true; // in this case we take care of username not existing and throw that condition out
              $scope.showErrorMessage('User not found with the provided credentials. Please try again.');
              return;
            }

            console.log("I am now checking if banned can login");

            if(res.data.length > 0){
              //dont let banned login
              console.log('isBanned=' + res.data[0].isBanned);
              if(res.data[0].isBanned === true)
              {
                $scope.showErrorMessage('Sorry, you may not login. You have a login restriction and will have to contact the admin');
                return;
              }

              User.updateLoginCount($scope.resFromUsername, 0).then(function(res){ });
              $rootScope.user = res.data[0];
              $rootScope.user.status = true;
              $location.path('/');

            }
            else{
              // username must exist, but wrong password
              User.updateLoginCount($scope.resFromUsername, $scope.loginCount + 1).then(function(res2){ });

              $scope.showErrorMessage('User not found with the provided credentials. Please try again.');
            }
          })

      })

    }
  });

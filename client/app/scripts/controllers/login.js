'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LoginCtrl', function ($scope, User, Movie, $rootScope, $timeout, $location) {
    console.log('In LoginCtrl');
    var userFound = false;
    $scope.loginUser = {};

    // Validate User credentials
    $scope.loginAttempt = function(){
      User.one('username', 'martindidiego').get().then(function(userList){
        userList.forEach(function(user, index){

          // Found user in user list
          if(user.username === $scope.loginUser.username && user.password === $scope.loginUser.password){
            $rootScope.user = userList[index];
            $rootScope.user.status = true;
            userFound = true;
          } 

        })

        // User not found
        userFound ? $location.path('/') : $scope.showErrorMessage('User not found with the provided credentials. Please try again.');
      })   		
    }

  });

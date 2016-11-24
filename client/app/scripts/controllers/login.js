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

    $scope.loginAttempt = function(){

      // Logs in to DB  
      User.login($scope.loginUser).then(function(res){
        if(res.data.length > 0){
          $rootScope.user = res.data[0];
          $rootScope.user.status = true;
          $location.path('/');
        }
        else{
          $scope.showErrorMessage('User not found with the provided credentials. Please try again.');
        }
      })

    }
  });

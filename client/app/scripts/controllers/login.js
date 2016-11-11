'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LoginCtrl', function ($scope, User) {
    console.log('In LoginCtrl');
    $scope.loginUser = {};

    // Validate User credentials
    $scope.loginAttempt = function(){
  		console.log('Attempted login credentials;', $scope.loginUser);

  		User.one('username', $scope.loginUser.username).get().then(function(res){
  			console.log('Response', res);
  		})
    }

  });

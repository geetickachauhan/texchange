'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($scope, User, $rootScope) {
    
    console.log('In Main controller');

    $scope.user = $rootScope.user;
    console.log('Logged in as ', $scope.user);


  });

'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($scope, User) {
    
    console.log('In Main controller');

    // Get User info on view load
    // $scope.user = User.one($routeParams.id).get().$object

  });

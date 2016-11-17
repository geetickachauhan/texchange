'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProfileViewCtrl
 * @description
 * # ProfileViewCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ProfileViewCtrl', function ($scope, User, Book, $routeParams, $http) {
  	console.log('In profile view controller');

  	$http({
  	  method: 'GET',
  	  url: 'http://localhost:3000/user/'+$routeParams.id
  	}).then(function successCallback(response) {
  		console.log(response)
  	    $scope.user = response.data;

  	    



  	  }, function errorCallback(response) {
  	    
  	  });
  });

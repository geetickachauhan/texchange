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
	    $scope.user = response.data;
      Book.getBooksOfUser($scope.user._id).then(function(res){
        console.log(res.data)
        $scope.books = res.data;
      })

	  }, function errorCallback(response) {
	  });

  // View Book Details Page
  $scope.viewBookDetails = function(bookId){
    $location.path('/book/'+bookId);
  }
});

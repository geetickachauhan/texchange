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

	    $scope.getRating = function(){

	    	console.log('fn', $scope.user.rating);

	    	var rate = 0;
	    	for(var i = 0; i < $scope.user.rating.length; i++){
	    		rate += $scope.user.rating[i];
	    	}

	    	var rate = rate / $scope.user.rating.length;
	    	console.log('User rating: ' + rate);

	    	var arr = [];
	    	for(var i = 0; i < rate; i++){
	    		arr.push(i);
	    	}
	    	return arr;
	    }


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

  

  $scope.newRate;
  $scope.rateUser = function(){
     var rating = $scope.newRate.split(' ')[0];
     var rateList = $scope.user.rating;
     rateList.push(parseInt(rating));
     
     User.rate($scope.user._id, rateList).then(function(res){
     	$scope.getRating();
     	$scope.showErrorMessage('The User has been rated ' + rating + ' stars', "Okay", function(){
     		
     	});
     })
     
  }

});

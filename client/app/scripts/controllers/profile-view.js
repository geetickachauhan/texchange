'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProfileViewCtrl
 * @description
 * # ProfileViewCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('ProfileViewCtrl', function ($scope, User, Book, $routeParams, $http, $rootScope, $location, Admin) {
	console.log('In profile view controller');

	$scope.loggedIn = false;
  $scope.self = false;

	console.log($rootScope.user)
	// Check if logged in to see if they can rate/ban
	if(typeof $rootScope.user !== 'undefined'){
		console.log('Logged in')
  		$scope.loggedIn = true;
  		$scope.loggedInUser = $rootScope.user;
  	}

	$http({
	  method: 'GET',
	  url: 'http://localhost:3000/user/'+$routeParams.id
	}).then(function successCallback(response) {
	    $scope.user = response.data;

      if($rootScope.user){
        if($scope.user._id === $rootScope.user._id){
          $scope.self = true; 
        }  
      }
      

	    $scope.getRating = function(){

	    	var rate = 0;

	    	// Get average
	    	for(var i = 0; i < $scope.user.rating.length; i++){
	    		rate += $scope.user.rating[i];
	    	}

	    	var rate = rate / $scope.user.rating.length;
	    	
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

  $scope.ban = function(){
  	User.updateToBanned($scope.user).then(function(res){
      var message = {
        email: $scope.user.email,
        username: $scope.user.username
      }
      Admin.sendBanMessage(message);
      Book.getBooksOfUser($scope.user._id).then(function(res){
        var bannedBooks = res.data;
        bannedBooks.forEach(function(book){
          Book.updateBookBan(book._id, true);
        })
      })

  		$scope.showErrorMessage($scope.user.first_name + ' ' + $scope.user.last_name + ' was successfully banned and can no longer log in unless unbanned by another Administrator. Please view the Profile page in order to see a list of banned users.', "Okay", function(){
  			$location.path('/');
  		})
  	})
  }

  $scope.rating = {
    newRate: 'Rate User'
  };
  $scope.rateUser = function(){
     var rating = $scope.rating.newRate.split(' ')[0];
     var rateList = $scope.user.rating;
     rateList.push(parseInt(rating));
     
     User.rate($scope.user._id, rateList).then(function(res){
     	$scope.getRating();
     	$scope.showErrorMessage('The User has been rated ' + rating + ' stars', "Okay", function(){
     		
     	});
     })
     
  }

});

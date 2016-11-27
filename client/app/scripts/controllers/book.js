'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:BookCtrl
 * @description
 * # BookCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('BookCtrl', function ($scope, $rootScope, $routeParams, $location, Book, User) {
    $scope.alreadyAdded = false;
    $scope.isUsersBook = false;
    // Get Book data
  	Book.getBook($routeParams.id).then(function(book){
  		$scope.book = book.data;
      if($rootScope.user.cart.indexOf($scope.book._id) !== -1){
        $scope.alreadyAdded = true;
      }  
      User.get($scope.book.seller).then(function(res){
        $scope.seller_username = res.data.username;
      })
  	})

    if($rootScope.user){
      Book.getBooksOfUser($rootScope.user._id).then(function(res){
        for(var i =0; i<res.data.length; i++){
          if($scope.book.seller === res.data[i].seller){
            $scope.isUsersBook = true;
          }    
        }
      })  
    }

  	$scope.addBookToCart = function(){
  		var cart = $rootScope.user.cart;
  		cart.push($scope.book._id)
  		User.updateCart($rootScope.user._id, cart).then(function(res){
  			console.log(res)
        $scope.showErrorMessage('Book added to your cart.', "Ok");
  		})
      $location.path('/')
  	}
  	
  });

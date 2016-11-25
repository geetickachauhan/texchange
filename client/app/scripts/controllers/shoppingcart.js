'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ShoppingcartCtrl
 * @description
 * # ShoppingcartCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ShoppingcartCtrl', function ($scope, $rootScope, $location, Book, User) {
    
  	if(typeof $rootScope.user === 'undefined' || typeof $rootScope.user === undefined){
  		console.log('Not logged in, redirecting to login');
  		$location.path('/login');
  		return;
  	}

    // View Book Details Page
    $scope.viewBookDetails = function(bookId){
      $location.path('/book/'+bookId);
    }

  	$scope.cart = [];
    console.log('cart', $rootScope.user.cart)

    // Populate angular cart with book info
  	for(var i = 0; i < $rootScope.user.cart.length; i++){
  		Book.getBook($rootScope.user.cart[i]).then(function(res){
  			$scope.cart.push(res.data);
  		})
  	}

  	$scope.removeFromCart = function(index){
  		$scope.cart.splice(index, 1);
  		User.updateCart($rootScope.user._id, $scope.cart).then(function(res){
  			$rootScope.user.cart = res.data.cart;
  		})
  	}

    $scope.checkout = function(){
      $location.path('/payment')
    }

  });

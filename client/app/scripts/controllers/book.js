'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:BookCtrl
 * @description
 * # BookCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('BookCtrl', function ($scope, $rootScope, $routeParams, Book, User) {

    // Get Book data
  	Book.getBook($routeParams.id).then(function(book){
  		$scope.book = book.data;
  	})

  	$scope.addBookToCart = function(){
  		var cart = $rootScope.user.cart;
  		cart.push($scope.book._id)
  		console.log('New cart', cart)
  		User.updateCart($rootScope.user._id, cart).then(function(res){
  			console.log(res)
  		})
  	}
  	
  });

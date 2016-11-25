'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TransactionsCtrl
 * @description
 * # TransactionsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('TransactionsCtrl', function ($scope, $rootScope, User, Book, $location) {
   Book.getBooksOfUser($rootScope.user._id).then(function(res){
   		$scope.sellingBooks = res.data;
   })

   $scope.cancelBookSale = function(book){
   	$scope.showErrorMessage('This action cannot be reversed. Are you sure you want to cancel this sale?', "Yes, I'm sure", function(){
   		Book.remove(book._id).then(function(){
   			$scope.sellingBooks.splice($scope.sellingBooks.indexOf(book), 1);
   		})
   	});
   }

	Book.getPurchases($rootScope.user._id).then(function(res){
		$scope.purchasedBooks = res.data;
	})   

	// View Book Details Page
	$scope.viewBookDetails = function(bookId){
		$location.path('/book/'+bookId);
	}
});

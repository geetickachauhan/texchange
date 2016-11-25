'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:PaymentCtrl
 * @description
 * # PaymentCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('PaymentCtrl', function ($scope, $rootScope, $location, Book) {
	$scope.cart = $rootScope.user.cart;
	console.log($scope.cart);

	// Pay books in DB
	$scope.paymentInfo = {};
	$scope.pay = function(){
		for(var i = 0; i < $scope.cart.length; i++){
			Book.pay($rootScope.user._id, $scope.cart[i]);
		}
		$scope.showErrorMessage('Thank you for your purchase! We hope you ejoyed using Texchange!', "Okay", function(){
			$location.path('/');
		});
	}

});

'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:PaymentCtrl
 * @description
 * # PaymentCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('PaymentCtrl', function ($scope, $rootScope, $location, Book, User) 
{
	$scope.cart = $rootScope.user.cart;
	console.log($scope.cart);
	

	// Pay books in DB
	$scope.pay = function()
	{
		console.log('payment', $scope.paymentInfo);

		var ifError = false;

			if($scope.paymentInfo.shipping_address.length > 40)
            {
              ifError = true;
              $scope.showErrorMessage("Shipping address is too long", "Ok", function(){
                return;
              });
            }

            if($scope.paymentInfo.billing_address.length > 40)
            {
              ifError = true;
              $scope.showErrorMessage("Billing address is too long", "Ok", function(){
                return;
              });
            }

            if($scope.paymentInfo.cardholder_name.length > 40)
            {
              ifError = true;
              $scope.showErrorMessage("Cardholder's name is too long", "Ok", function(){
                return;
              });
            }

            if($scope.paymentInfo.card_number.length !== 16)
            {
              ifError = true;
              $scope.showErrorMessage("Card number must be only 16 digits long", "Ok", function(){
                return;
              });
            }

            if(isNaN($scope.paymentInfo.card_number))
            {
            	ifError = true;
            	$scope.showErrorMessage("Card number field must only be numerical input", "Ok", function(){
                return;
              });
            }


            if($scope.paymentInfo.card_exp.length === 5)
            {
           	  	if(!isNaN($scope.paymentInfo.card_exp.substr(0,2)) && $scope.paymentInfo.card_exp.charAt(2) === '/'
           	  		&& !isNaN($scope.paymentInfo.card_exp.substr(3,2)))
           	  	{
           	  		if(parseInt($scope.paymentInfo.card_exp.substr(0, 2)) > 12 || parseInt($scope.paymentInfo.card_exp.substr(0, 2)) < 1)
           	  		{
           	  			ifError = true;
           	  			$scope.showErrorMessage("Expiration date month must be between 01 and 12", "Ok", function(){
                			return;
              			});
           	  		}

           	  		if(parseInt($scope.paymentInfo.card_exp.substr(3, 2)) > 31 || parseInt($scope.paymentInfo.card_exp.substr(3, 2)) < 1)
           	  		{
           	  			ifError = true;
           	  			$scope.showErrorMessage("Expiration date day must be between 01 and 31", "Ok", function(){
                			return;
              			});
           	  		}
           	  	}
           	  	else
           	  	{
           		  	ifError = true;
           		  	$scope.showErrorMessage("Expiration date be in the correct format (MM/DD)1", "Ok", function(){
            	    	return;
            	  	});
           		}
           	}
           	else
           	{
           		ifError = true;
           		$scope.showErrorMessage("Expiration date be in the correct format (MM/DD)", "Ok", function(){
                	return;
              	});
           	}

            if($scope.paymentInfo.card_cvv.length !== 3)
            {
              ifError = true;
              $scope.showErrorMessage("CVV code must be only 3 digits long", "Ok", function(){
                return;
              });
            }

            if(isNaN($scope.paymentInfo.card_cvv))
            {
            	ifError = true;
            	$scope.showErrorMessage("CVV field must only be numerical input", "Ok", function(){
                return;
              });
            }

            if (ifError === true)
            {
              return;
            }

		for(var i = 0; i < $scope.cart.length; i++)
		{
			Book.pay($rootScope.user._id, $scope.cart[i]);
		}
		/*
  		$scope.cart.splice(0, $scope.cart.length);
  		User.updateCart($rootScope.user._id, $scope.cart).then(function(res){
  			$rootScope.user.cart = res.data.cart;
  			$location.path('/'); 
			$scope.showErrorMessage('Thank you for your purchase! We hope you ejoyed using Texchange!', "Ok", function(){
				return;
			});
  		})*/
		Book.emptyCart($rootScope.user._id, $scope.cart[i]).then(function(res){
			console.log(res.data)
  			$rootScope.user.cart = res.data;
  			$location.path('/'); 
  		})
  		
	}

});

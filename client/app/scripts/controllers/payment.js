'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:PaymentCtrl
 * @description
 * # PaymentCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('PaymentCtrl', function ($scope, $rootScope, $location, Book, User){

  if(typeof $rootScope.user === 'undefined' || typeof $rootScope.user === undefined){
    console.log('Not logged in, redirecting to login');
    $location.path('/login');
    return;
  }

	$scope.cart = $rootScope.user.cart;
	console.log($scope.cart);

  var ifError = false;
  $scope.paid = false;

  $scope.continue = function(){
    $location.path('/');
  }

	// Pay books in DB
	$scope.pay = function(){
		console.log('payment', $scope.paymentInfo);



			if($scope.paymentInfo.shipping_address.length > 40)
            {
              ifError = true;
              $scope.showErrorMessage("Shipping address is too long", "OK", function(){ });
							return;
            }

            if($scope.paymentInfo.billing_address.length > 40)
            {
              ifError = true;
              $scope.showErrorMessage("Billing address is too long", "OK", function(){ });
							return;
            }

            if($scope.paymentInfo.cardholder_name.length > 40)
            {
              ifError = true;
              $scope.showErrorMessage("Cardholder's name is too long", "OK", function(){ });
							return;
            }

            if($scope.paymentInfo.card_number.length !== 16)
            {
              ifError = true;
              $scope.showErrorMessage("Card number must be only 16 digits long", "OK", function(){});
							return;
            }

            if(isNaN($scope.paymentInfo.card_number))
            {
            	ifError = true;
            	$scope.showErrorMessage("Card number field must only be numerical input", "OK", function(){ });
							return;
            }


            if($scope.paymentInfo.card_exp.length === 5)
            {
           	  	if(!isNaN($scope.paymentInfo.card_exp.substr(0,2)) && $scope.paymentInfo.card_exp.charAt(2) === '/'
           	  		&& !isNaN($scope.paymentInfo.card_exp.substr(3,2)))
           	  	{
           	  		if(parseInt($scope.paymentInfo.card_exp.substr(0, 2)) > 12 || parseInt($scope.paymentInfo.card_exp.substr(0, 2)) < 1)
           	  		{
           	  			ifError = true;
           	  			$scope.showErrorMessage("Expiration date month must be between 01 and 12", "OK", function(){});
										return;
           	  		}

           	  		if(parseInt($scope.paymentInfo.card_exp.substr(3, 2)) > 31 || parseInt($scope.paymentInfo.card_exp.substr(3, 2)) < 1)
           	  		{
           	  			ifError = true;
           	  			$scope.showErrorMessage("Expiration date day must be between 01 and 31", "OK", function(){ });
										return;
           	  		}
           	  	}
           	  	else
           	  	{
           		  	ifError = true;
           		  	$scope.showErrorMessage("Expiration date be in the correct format (MM/DD)", "OK", function(){ });
									return;
           		}
           	}
           	else
           	{
           		ifError = true;
           		$scope.showErrorMessage("Expiration date be in the correct format (MM/DD)", "OK", function(){});
							return;
           	}

            if($scope.paymentInfo.card_cvv.length !== 3)
            {
              ifError = true;
              $scope.showErrorMessage("CVV code must be only 3 digits long", "OK", function(){ });
							return;
            }

            if(isNaN($scope.paymentInfo.card_cvv))
            {
            	ifError = true;
            	$scope.showErrorMessage("CVV field must only be numerical input", "OK", function(){ });
							return;
            }

		for(var i = 0; i < $scope.cart.length; i++)
		{
			Book.pay($rootScope.user._id, $scope.cart[i]);
		}

    $scope.showErrorMessage('Thank you for your purchase! We hope you ejoyed using Texchange!', "Ok", function(){
          Book.emptyCart($rootScope.user._id).then(function(res){
              console.log(res.data)
              $rootScope.user = res.data; 
              $rootScope.user.status = true
            })
          $scope.paid = true;
    });
		
  		// $scope.cart.splice(0, $scope.cart.length);
  		// User.updateCart($rootScope.user._id, $scope.cart).then(function(res){
  		// 	$rootScope.user.cart = res.data.cart;
  		// 	$location.path('/');
			   
  		//   })
		

	}

});

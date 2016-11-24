'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the clientApp
 */
 angular.module('clientApp')
 .controller('ProfileCtrl', function ($scope, $rootScope, User, $location) {

 	console.log('In Profile Controller');
 	console.log($rootScope.user)

 	if(typeof $rootScope.user === 'undefined' || typeof $rootScope.user === undefined){
 		console.log('Not logged in, redirecting to login');
 		$location.path('/login');
 		return;
 	}

	$scope.birthday = {};
	$scope.editMode = false;

	User.get($rootScope.user._id).then(function(res){
		$scope.user = res.data;
		
		var bday = $scope.user.dob.split('/');
		$scope.birthday.day = bday[0];
		$scope.birthday.month = bday[1];
		$scope.birthday.year = bday[2];

		// Save edited user
		$scope.saveUser = function() {

			$scope.user.dob = $scope.birthday.month + "/" + $scope.birthday.day + "/" + $scope.birthday.year;
			console.log('Edited User Info: ', $scope.user);
			
			User.update($scope.user).then(function(res){
				$rootScope.user = res.data;
				$scope.editMode = false;
				$rootScope.user.status = true;
				$scope.showErrorMessage('Account Updated!');
			})
		};

		// Delete User
		$scope.deactivateUser = function(){
			$scope.showErrorMessage('This action cannot be reversed. You will still be able to explore Textchange, but you will have to re-register to sell any books. Are you sure you want to deactivate your account?', "Yes, I'm sure", function(){
				User.remove($rootScope.user._id).then(function(){
					$location.path('/login');						
				})
			});			
		}
	})
 	
 });

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

 	$scope.birthday = {};
 	$scope.editMode = false;

 	User.one($rootScope.user._id).get().then(function(user){
 		console.log(user)
 		$scope.user = user;
 		var bday = user.dob.split('/');
 		$scope.birthday.day = bday[0];
 		$scope.birthday.month = bday[1];
 		$scope.birthday.year = bday[2];

 		// Save edited user
 		$scope.saveUser = function() {
 			$scope.user.dob = $scope.birthday.month + "/" + $scope.birthday.day + "/" + $scope.birthday.year;
 			console.log('Edited User Info: ', $scope.user);
 			$scope.user.save().then(function(res) {
 				console.log('saved', res);
 				$rootScope.user = res;
 				$scope.editMode = false;
 				$rootScope.user.status = true;
 				$scope.showErrorMessage('Account Updated!');
 			});
 		};

 		// Delete User
 		$scope.deactivateUser = function(){
 			$scope.showErrorMessage('This action cannot be reversed. You will still be able to explore Textchange, but you will have to re-register to sell any books. Are you sure you want to deactivate your account?', "Yes, I'm sure", function(){
 				$scope.user.remove();
 				$location.path('/login');
 			});			
 		}
 	})
 });

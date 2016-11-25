'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ForgotpasswordCtrl
 * @description
 * # ForgotpasswordCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('ForgotpasswordCtrl', function ($scope, User) {
	$scope.email = '';
	$scope.sendReq = function(){
		console.log('res'+ $scope.email)
		User.requestPassword($scope.email).then(function(){
			$scope.showErrorMessage('An email has been sent to the account associated with this email address');
		});
	}
});

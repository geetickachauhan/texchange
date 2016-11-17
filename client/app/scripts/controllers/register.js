'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('RegisterCtrl', function ($scope, User, $location, $rootScope) {
    
  	$scope.user = {
  		isBanned: false,
  		rating: 3
  	}
  	$scope.birthday = {};

  	$scope.registerUser = function(){

      if($scope.user.password < 8){
        // Fix error
        return;
      }

  		$scope.user.dob = $scope.birthday.month + "/" + $scope.birthday.day + "/" + $scope.birthday.year;
  		console.log('Registering:', $scope.user);

      User.create($scope.user).then(function(res){
        $rootScope.user = res.data;
        $rootScope.user.status = true;
        $location.path('/');  
      })
  	}
  });

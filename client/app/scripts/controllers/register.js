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

      var errorMessage = "";

            if($scope.user.email.includes("@") === false)
            {
              errorMessage += "Invalid email entered\n"
            }

            if($scope.user.username.length < 6 || $scope.user.username.length > 16)
            {
              errorMessage += "Username must have length of 6 to 16 characters\n"
            }

            if($scope.user.password.length < 8 || $scope.user.password.length > 12)
            {
              errorMessage += "Password must have length of 8 to 12 characters\n"
            }

            if(errorMessage.length > 0)
            {
              window.alert(errorMessage);
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

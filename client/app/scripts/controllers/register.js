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

      var ifError = false;

            if($scope.user.email.includes("@") === false)
            {
              ifError = true;
              $scope.showErrorMessage("Invalid email entered", "Ok", function(){
                return;
              });
            }

            if($scope.user.username.length < 6 || $scope.user.username.length > 16)
            {
              ifError = true;
              $scope.showErrorMessage("Username must have length of 6 to 16 characters", "Ok", function(){
                return;
              });
            }

            if($scope.user.password.length < 8 || $scope.user.password.length > 12)
            {
              ifError = true;
              $scope.showErrorMessage("Password must have length of 8 to 12 characters", "Ok", function(){
                return;
              });
            }

            if (ifError === true)
            {
              return;
            }

      $scope.user.dob = $scope.birthday.month + "/" + $scope.birthday.day + "/" + $scope.birthday.year;
      console.log('Registering:', $scope.user);

      User.create($scope.user).then(function(res){
        $rootScope.user = res.data;
        $rootScope.user.status = true;
        $location.path('/'); 
        $scope.showErrorMessage("Please verify your email.", "Ok", function(){
          return;
        }); 
      })
    }
  });
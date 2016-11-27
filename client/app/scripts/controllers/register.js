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
              $scope.showErrorMessage("Invalid email entered", "OK", function(){
                return;
              });
              return;
            }

            if($scope.user.username.length < 6 || $scope.user.username.length > 16)
            {
              $scope.showErrorMessage("Username must have length of 6 to 16 characters", "OK", function(){
                return;
              });
              return;
            }

            if($scope.user.password.length < 8 || $scope.user.password.length > 12)
            {
              $scope.showErrorMessage("Password must have length of 8 to 12 characters", "OK", function(){
                return;
              });
              return;
            }



            User.getEmail($scope.user.email).then(function(res){
              console.log("Response object" + res.data);
              if(res.data.length > 0)
              {
              $scope.showErrorMessage("This email already exists in our system. Please enter another email", "OK",function(){

              });
                return; // means after this registering will not take place
              }

              $scope.user.dob = $scope.birthday.month + "/" + $scope.birthday.day + "/" + $scope.birthday.year;
              console.log('Registering:', $scope.user);

              User.create($scope.user).then(function(res){
                $rootScope.user = res.data;
                $rootScope.user.status = true;
                $scope.showErrorMessage("Please verify your email.", "OK", function(){
                  return;
              });
              $location.path('/');
              })
            });
    }
  });

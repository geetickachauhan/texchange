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
    var oldfirstname = $scope.user.first_name;
    var oldlastname = $scope.user.last_name;
    var olddisplayname = $scope.user.username;
    var oldEmail = $scope.user.email;


		var bday = $scope.user.dob.split('/');
		$scope.birthday.day = bday[0];
		$scope.birthday.month = bday[1];
		$scope.birthday.year = bday[2];

    var oldbirthday = bday[0];
    var oldbirthmonth = bday[1];
    var oldbirthyear = bday[2];
		// Save edited user
		$scope.saveUser = function() {
      if($scope.user.first_name == oldfirstname && $scope.user.last_name == oldlastname
        && $scope.user.username == olddisplayname && $scope.user.email == oldEmail
        && $scope.birthday.day == oldbirthday && $scope.birthday.month == oldbirthmonth && $scope.birthday.year == oldbirthyear)
        {
          $scope.showErrorMessage('You did not make any changes. Please try again.', "Okay", function(){

          })
          	return;
        }

      if(oldEmail != $scope.user.email)
      {
        $scope.showErrorMessage('You just changed your email. Please verify it.', "Okay", function(){
  			// nothing to be done and do not return
        })
      }
      if(/[^a-zA-Z(* )]/.test($scope.user.first_name)) // test if there is something that's not an alphabet
      {
        $scope.showErrorMessage('First name must be only alphabetic', "Okay", function(){

        })
        return;
      }
      if(/[^a-zA-Z(* )]/.test($scope.user.last_name)) // test if there is something that's not an alphabet
      {
        $scope.showErrorMessage('Last name must be only alphabetic', "Okay", function(){

        })
        return;
      }

      if(/[^(?!.*  )a-zA-Z0-9@]/.test($scope.user.email)) //test if email does not have @
      {
        $scope.showErrorMessage('Please enter a valid email', "Okay", function(){

        })
        	return;
      }


      // no validate for password as we are not allowing them to edit their password
      // need to redirect to reset password if they want to change their password - include a button called reset password

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
			$scope.showErrorMessage('This action cannot be reversed. You will still be able to explore Texchange, but you will have to re-register to sell any books. Are you sure you want to deactivate your account?', "Yes, I'm sure", function(){
				User.remove($rootScope.user._id).then(function(){
					$location.path('/login');
				})
			});
		}
	})

 });
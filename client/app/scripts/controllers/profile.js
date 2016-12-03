'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the clientApp
 */
 angular.module('clientApp')
 .controller('ProfileCtrl', function ($scope, $rootScope, User, $location, Admin, Book) {

 	console.log('In Profile Controller');
 	console.log($rootScope.user)

 	if(typeof $rootScope.user === 'undefined' || typeof $rootScope.user === undefined){
 		console.log('Not logged in, redirecting to login');
 		$location.path('/login');
 		return;
 	}

  $scope.goToReset = function(){
    $location.path('/forgotPassword')
  }
	$scope.birthday = {};
	$scope.editMode = false;
  $scope.admin = false; // by default define admin to be false
  $scope.numBanned = false;

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

    console.log("User is admin=" + $scope.user.isAdmin);
    // CHECK OUT FOR ADMIN RELATED CHANGES
    if($scope.user.isAdmin == true)
    {
      $scope.admin = true; // to tell the form to display the admin
      User.getBanned().then(function(res){
        console.log('Banned users' + res.data);
        $scope.banned = res.data; // array of banned user objects
        if($scope.banned.length > 0)
        {
          $scope.numBanned = true;
        }
        // just need to figure out a way to display these banned users now
      });
    }

    $scope.unbanUser = function(user){
      //basically need to do a put in order to change the banned to unbanned

      User.updateToUnbanned(user).then(function(res){
        console.log(res.data);

        Book.getBooksOfUser(res.data._id).then(function(res){
          var unBannedBooks = res.data;
          console.log('Unbanned books', unBannedBooks);
          unBannedBooks.forEach(function(book){
            Book.updateBookBan(book._id, false);
          })
        })

        var message = {
          username: res.data.username,
          email: res.data.email
        }

        Admin.sendUnbanMessage(message);
        $scope.showErrorMessage('User ' + res.data.first_name + ' ' + res.data.last_name + ' was successfully unbanned');
        User.getBanned().then(function(res){
          console.log(' New list of banned users' + res.data);
          $scope.banned = res.data; // array of banned user objects
          if($scope.banned.length > 0)
          {
            $scope.numBanned = true;
          }
          if($scope.banned.length === 0)
          {
            $scope.numBanned = false;
          }
          // just need to figure out a way to display these banned users now
        });
      });

    }
		// Save edited user
		$scope.saveUser = function() {
      if($scope.user.first_name == oldfirstname && $scope.user.last_name == oldlastname
        && $scope.user.username == olddisplayname && $scope.user.email == oldEmail
        && $scope.birthday.day == oldbirthday && $scope.birthday.month == oldbirthmonth && $scope.birthday.year == oldbirthyear)
        {
          $scope.showErrorMessage('You did not make any changes. Please try again.', "Okay", function(){

          })

          $scope.editMode = false;
        	return;
        }

      if(oldEmail != $scope.user.email)
      {
        $scope.showErrorMessage('You just changed your email. Please verify it.', "Okay", function(){
  			// nothing to be done and do not return
        })
        User.update($scope.user).then(function(res){
          $rootScope.user = res.data;
          $scope.editMode = false;
          $rootScope.user.status = true;
        })
        $scope.editMode = false;
        return
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

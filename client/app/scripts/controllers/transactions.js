'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TransactionsCtrl
 * @description
 * # TransactionsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('TransactionsCtrl', function ($scope, $rootScope, User, Book, $location) {

   if(typeof $rootScope.user === 'undefined' || typeof $rootScope.user === undefined){
      console.log('Not logged in, redirecting to login');
      $location.path('/login');
      return;
   }

   $scope.hasReported = false;
   Book.getBooksOfUser($rootScope.user._id).then(function(res){
   		$scope.sellingBooks = res.data.filter(book => !book.isPaid);
         $scope.soldBooks = res.data.filter(book => book.isPaid);
         console.log('Sold books', $scope.soldBooks);
   })

   $scope.cancelBookSale = function(book){
   	$scope.showErrorMessage('This action cannot be reversed. Are you sure you want to cancel this sale?', "Yes, I'm sure", function(){
   		Book.remove(book._id).then(function(res){
   			$scope.sellingBooks.splice($scope.sellingBooks.indexOf(book), 1);
   		})
   	});
   }

	Book.getPurchases($rootScope.user._id).then(function(res){
		$scope.purchasedBooks = res.data;
	})   

	// View Book Details Page
	$scope.viewBookDetails = function(bookId){
		$location.path('/book/'+bookId);
	}

   $scope.reportUser = function(book){

      User.get(book.seller).then(function(res){
         var reportedUser = res.data;
         var reportCount = reportedUser.reportCount
         var newReportCount = reportCount + 1;
         User.report(reportedUser._id, newReportCount).then(function(res){
            var updatedReportCount = res.data.reportCount;
            if(updatedReportCount >= 3){
               console.log('Banning user temporarily');
               User.updateToBanned(res.data).then(function(res){
                  console.log("BANNED", res.data);
               })
            }

            $scope.showErrorMessage('User has successfully been reported. Thank you for making this community safer!', "Okay", function(){
               $scope.hasReported = true;
            })

         })
      })
      
   }

});

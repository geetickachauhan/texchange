'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', function ($scope, User, Book, $rootScope, $location) {

    console.log('In Main controller');

    // Load User data
    $scope.user = $rootScope.user;
    
    console.log('Logged in as ', $scope.user);

    // Get featured books
    Book.getBooks().then(function(res){
        if($rootScope.user){

            $scope.books = res.data.filter(book => book.seller !== $rootScope.user._id && !book.isPaid && !book.isBanned);
            console.log($scope.books)
        } else {
            $scope.books = res.data.filter(book => !book.isPaid && !book.isBanned);
            // console.log($scope.books)
        }

    })

    // View Book Details Page
    $scope.viewBookDetails = function(bookId){
    	$location.path('/book/'+bookId);
    }

  });

'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ListbookCtrl
 * @description
 * # ListbookCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ListbookCtrl', function ($scope, $rootScope, $location, Book) {
    console.log('In listbook ctrl');

    if(typeof $rootScope.user === 'undefined'){
      console.log('Not logged in, redirecting to login');
      $location.path('/login');
    }

    $scope.book = {}


    $scope.listBook = function(){


      if(/[^(?!.*  )a-zA-Z0-9]/.test($scope.book.title)) // test if any are not alphanumeric
      {
        $scope.showErrorMessage("Book Title must be alphanumeric", "Ok", function(){
          
        });
        return;
      }
      if(/[^0-9]/.test($scope.book.isbn)) // test if they are not numeric
      {
        $scope.showErrorMessage("ISBN must be numeric", "Ok", function(){
          
        });
        return;
      }
      if($scope.book.isbn.length != 13)
      {
        $scope.showErrorMessage("ISBN must be a 13 digit field", "Ok", function(){
          
        });
        return;
      }
      if(/[^a-zA-Z(* )]/.test($scope.book.author)) // test if there is something that's not an alphabet
      {
        $scope.showErrorMessage("Author must be alphabetic", "Ok", function(){
          
        });
        return;
      }
      if($scope.book.author.length > 20)
      {
        $scope.showErrorMessage("Author must be max length 20", "Ok", function(){
          
        });
        return;
      }
      if(/[^0-9]/.test($scope.book.edition)) // test if there is something that's not an number
      {
        $scope.showErrorMessage("Edition must be numeric", "Ok", function(){
          
        });
        return;
      }
      if($scope.book.edition.length > 5)
      {
        $scope.showErrorMessage("Edition must be max length 5", "Ok", function(){
          
        });
        return;
      }
      if(/[^\b((N|n)ew)|((G|g)ood)|((P|p)oor)\b]/.test($scope.book.condition))
      {
        $scope.showErrorMessage("Condition can only be New, Good or Poor", "Ok", function(){
          
        });
        return;
      }
      if(/[^0-9]/.test($scope.book.num_pages))
      {
        $scope.showErrorMessage("Number of Pages can only be numeric", "Ok", function(){
          
        });
        return;
      }
      if($scope.book.num_pages.length > 8)
      {
        $scope.showErrorMessage("Number of Pages must be a max of 8 characters", "Ok", function(){
          
        });
        return;
      }
      if(/[^0-9.]/.test($scope.book.price))
      {
        $scope.showErrorMessage("Price can only be numeric", "Ok", function(){
          
        });
        return;
      }
      if($scope.book.price.length > 8)
      {
        $scope.showErrorMessage("Price must be a max of 8 characters", "Ok", function(){
          
        });
        return;
      }
      if(/[^a-zA-Z]/.test($scope.book.language))
      {
        $scope.showErrorMessage("Language must be only Alphabet", "Ok", function(){
          
        });
        return;
      }
      if(/[^a-zA-Z]/.test($scope.book.genre))
      {
        $scope.showErrorMessage("Genre must be alphabetic", "Ok", function(){
          
        });
        return;
      }
      if($scope.book.genre.length > 20)
      {
        $scope.showErrorMessage("Genre must be a maximum of 20 fields", "Ok", function(){
          
        });
        return;
      }

      $scope.book.seller = $rootScope.user._id

      console.log('Registering:', $scope.book);
      Book.addBook($scope.book).then(function(res){
        console.log(res);
        $location.path('/book/'+res.data._id);
      })
    }

  });

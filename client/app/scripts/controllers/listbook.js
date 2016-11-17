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
        window.alert("Book Title must be alphanumeric");
        return;
      }
      if(/[^0-9]/.test($scope.book.isbn)) // test if they are not numeric
      {
        window.alert("ISBN must be numeric");
        return;
      }
      if($scope.book.isbn.length != 13)
      {
        window.alert("ISBN must be a 13 digit field");
        return;
      }
      if(/[^a-zA-Z(* )]/.test($scope.book.author)) // test if there is something that's not an alphabet
      {
        window.alert("Author must be alphabetic");
        return;
      }
      if($scope.book.author.length > 20)
      {
        window.alert("Author must be max length 20");
        return;
      }
      if(/[^0-9]/.test($scope.book.edition)) // test if there is something that's not an number
      {
        window.alert("Edition must be numeric");
        return;
      }
      if($scope.book.edition.length > 5)
      {
        window.alert("Edition must be max length 5");
        return;
      }
      if(/[^\b((N|n)ew)|((G|g)ood)|((P|p)oor)\b]/.test($scope.book.condition))
      {
        window.alert("Condition can only be New, Good or Poor");
        return;
      }
      if(/[^0-9]/.test($scope.book.num_pages))
      {
        window.alert("Number of Pages can only be numeric");
        return;
      }
      if($scope.book.num_pages.length > 8)
      {
        window.alert("Number of Pages must be a max of 8 characters");
        return;
      }
      if(/[^0-9.]/.test($scope.book.price))
      {
        window.alert("Price can only be numeric");
        return;
      }
      if($scope.book.price.length > 8)
      {
        window.alert("Price must be a max of 8 characters");
        return;
      }
      if(/[^a-zA-Z]/.test($scope.book.language))
      {
        window.alert("Language must be only Alphabet");
        return;
      }
      if(/[^a-zA-Z]/.test($scope.book.genre))
      {
        window.alert("Genre must be alphabetic");
        return;
      }
      if($scope.book.genre.length > 20)
      {
        window.alert("Genre must be a maximum of 20 fields");
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

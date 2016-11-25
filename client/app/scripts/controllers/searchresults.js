'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SearchresultsCtrl
 * @description
 * # SearchresultsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('SearchresultsCtrl', function ($scope, Book, $routeParams, $location) {

  	$scope.searchText = $routeParams.search;

    Book.search($routeParams.search).then(function(res){
      $scope.results = res.data;
    })

    Book.searchAuthor($routeParams.search).then(function(res){
      $scope.authorResults = res.data;
    })

     // View Book Details Page
    $scope.viewBookDetails = function(bookId){
    	$location.path('/book/'+bookId);
    }
  });

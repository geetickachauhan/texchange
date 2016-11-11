'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SearchresultsCtrl
 * @description
 * # SearchresultsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('SearchresultsCtrl', function ($scope, Book) {
    Book.one('title', 'CoolBook').get().then(function(book){
      console.log(book)
    })
  });

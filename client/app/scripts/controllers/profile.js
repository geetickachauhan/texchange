'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ProfileCtrl', function ($scope, User) {
    
  	console.log('In Profile Controller');
  	User.one('username', 'martindidiego').get().then(function(res){
  		console.log(res);
  	})

  });

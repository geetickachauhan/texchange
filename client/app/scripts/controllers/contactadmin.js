'use strict';
/**
 * @ngdoc function
 * @name clientApp.controller:ContactadminCtrl
 * @description
 * # ContactadminCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ContactadminCtrl', function ($scope, $location, Admin) {
    
    $scope.message = {};
    
    $scope.contactAdminFn = function(){

      Admin.sendAdminMessage($scope.message)

      $scope.showErrorMessage('Thank you. Your Message has been sent successfully to the Admin.', "Okay", function(){
        $location.path('/')
      }); 
      
    }
});

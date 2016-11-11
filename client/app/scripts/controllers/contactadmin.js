'use strict';
/**
 * @ngdoc function
 * @name clientApp.controller:ContactadminCtrl
 * @description
 * # ContactadminCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ContactadminCtrl', function ($scope) {
    $scope.contactAdminObj = { }

    console.log($scope.contactAdmin);

    $scope.contactAdminFn = function(){
      window.alert("Thank you. Your Message has been sent successfully to the Admin.");

      var file = new File([""], "contactAdmin.txt", {type: "text/plain;charset=utf-8"});
      //file.open("contactAdmin.txt");
      /*
      var fs = require("contactAdmin");
      var file = fs.readFileSync("contactAdmin.txt", "UTF-8");
      console.log(file);
      */
      //var blob = new Blob([""], {type: "text/plain;charset=utf-8"});
      /*
      var file = new File([""], "contactAdmin.txt", {type: "text/plain;charset=utf-8"})
      file.open("w"); // open file with write access
      file.writeln($scope.contactAdminObj.type);
      file.writeln($scope.contactAdminObj.subject);
      file.writeln($scope.contactAdminObj.message);
      file.close();
      */
    }
  });

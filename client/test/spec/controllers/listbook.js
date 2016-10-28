'use strict';

describe('Controller: ListbookCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ListbookCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListbookCtrl = $controller('ListbookCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ListbookCtrl.awesomeThings.length).toBe(3);
  });
});

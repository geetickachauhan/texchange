'use strict';

describe('Controller: TransactionsCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var TransactionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransactionsCtrl = $controller('TransactionsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransactionsCtrl.awesomeThings.length).toBe(3);
  });
});

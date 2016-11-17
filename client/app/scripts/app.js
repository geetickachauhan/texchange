'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
 angular.module('clientApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'restangular',
  'angularModalService'
  ]).controller('appCtrl', function ($rootScope, $scope, $location, ModalService) {
    console.log('In AppCtrl');

    $scope.showErrorMessage = function(errormsg, btn, cb) {


           // Just provide a template url, a controller and call 'showModal'.
           ModalService.showModal({
             templateUrl: "views/modal/popup.html",
             controller: function($scope, $location, $rootScope, User){
              $scope.error = errormsg;
              btn ? $scope.btn = btn : $scope.btn = "Okay";
              $scope.close = function(){
               if(cb){cb()}
                 close(false);
               $('.modal-backdrop').css('opacity', 0);
               $('.modal-backdrop').css('display', 'none');
             }
           }
         }).then(function(modal) {
             // The modal object has the element built, if this is a bootstrap modal
             // you can call 'modal' to show it, if it's a custom modal just show or hide
             // it as you need to.
             modal.element.modal();

           });

       };

   $scope.signOut = function(){
    console.log("Logging out user...")
    $rootScope.user.status = false;
    $rootScope.user = undefined
    console.log($rootScope.user)
    $location.path('/login')
  }
}).config(function ($routeProvider, RestangularProvider) {

  RestangularProvider.setBaseUrl('http://localhost:3000');

  $routeProvider
  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl',
    controllerAs: 'main'
  })
  .when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AboutCtrl',
    controllerAs: 'about'
  })
  .when('/Users', {
    templateUrl: 'views/movies.html',
    controller: 'MoviesCtrl',
    controllerAs: 'movies'
  })
  .when('/transactions', {
    templateUrl: 'views/transactions.html',
    controller: 'TransactionsCtrl',
    controllerAs: 'transactions'
  })
  .when('/book', {
    templateUrl: 'views/book.html',
    controller: 'BookCtrl',
    controllerAs: 'book'
  })
  .when('/book/:id', {
    templateUrl: 'views/book.html',
    controller: 'BookCtrl',
    controllerAs: 'book'
  })
  .when('/searchResults', {
    templateUrl: 'views/searchresults.html',
    controller: 'SearchresultsCtrl',
    controllerAs: 'searchResults'
  })
  .when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'ProfileCtrl',
    controllerAs: 'profile'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'register'
  })
  .when('/contactAdmin', {
    templateUrl: 'views/contactadmin.html',
    controller: 'ContactadminCtrl',
    controllerAs: 'contactAdmin'
  })
  .when('/forgotPassword', {
    templateUrl: 'views/forgotpassword.html',
    controller: 'ForgotpasswordCtrl',
    controllerAs: 'forgotPassword'
  })
  .when('/forgotPassword', {
    templateUrl: 'views/forgotpassword.html',
    controller: 'ForgotpasswordCtrl',
    controllerAs: 'forgotPassword'
  })
  .when('/shoppingCart', {
    templateUrl: 'views/shoppingcart.html',
    controller: 'ShoppingcartCtrl',
    controllerAs: 'shoppingCart'
  })
  .when('/payment', {
    templateUrl: 'views/payment.html',
    controller: 'PaymentCtrl',
    controllerAs: 'payment'
  })
  .when('/listbook', {
    templateUrl: 'views/listbook.html',
    controller: 'ListbookCtrl',
    controllerAs: 'listbook'
  })
  .when('/movies', {
    templateUrl: 'views/movies.html',
    controller: 'MoviesCtrl',
    controllerAs: 'movies'
  })
  .when('/create/movie', {
    templateUrl: 'views/movie-add.html',
    controller: 'MovieAddCtrl',
    controllerAs: 'movieAdd'
  })
  .when('/movie/:id', {
    templateUrl: 'views/movie-view.html',
    controller: 'MovieViewCtrl',
    controllerAs: 'movieView'
  })
  .when('/movie/:id/delete', {
    templateUrl: 'views/movie-delete.html',
    controller: 'MovieDeleteCtrl',
    controllerAs: 'movieDelete'
  })
  .when('/movie/:id/edit', {
    templateUrl: 'views/movie-edit.html',
    controller: 'MovieEditCtrl',
    controllerAs: 'movieEdit'
  })
  .when('/signOut', {
    templateUrl: 'views/signout.html',
    controller: 'SignoutCtrl',
    controllerAs: 'signOut'
  })
  .when('/profile-view/:id', {
    templateUrl: 'views/profile-view.html',
    controller: 'ProfileViewCtrl',
    controllerAs: 'profileView'
  })
  .otherwise({
    redirectTo: '/'
  });
})
// USER ENDPOINTS
.factory('User',function($rootScope, $http){
  return {
    login: function(loginParams){
      return $http({
        method: 'GET',
        url: 'http://localhost:3000/user/?username='+loginParams.username+'&password='+loginParams.password
      }).then(function successCallback(response) {
        return response;
      }, function errorCallback(response) {
        return response;
      });
    },

    get: function(userId){
      return $http({
        method: 'GET',
        url: 'http://localhost:3000/user/'+userId
      }).then(function successCallback(response) {
        return response;
      }, function errorCallback(response) {
        return response;
      });
    },

    update: function(user){
      return $http({
        method: 'PUT',
        url: 'http://localhost:3000/user/'+user._id,
        data: user
      }).then(function successCallback(response) {
        return response;
      }, function errorCallback(response) {
        return response;
      });
    },

    remove: function(userId){
      return $http({
        method: 'DELETE',
        url: 'http://localhost:3000/user/'+userId
      }).then(function successCallback(response) {
        return response;
      }, function errorCallback(response) {
        return response;
      });
    },

    create: function(user){
      return $http({
        method: 'POST',
        url: 'http://localhost:3000/user/',
        data: user
      }).then(function successCallback(response) {
        return response;
      }, function errorCallback(response) {
        return response;
      });
    },

    updateCart: function(userId, newCart){
      return $http({
        method: 'PUT',
        url: 'http://localhost:3000/user/'+userId,
        data: {cart: newCart}
      }).then(function successCallback(response) {
        return response;
      }, function errorCallback(response) {
        return response;
      });
    }

  }
})

// BOOK ENDPOINTS
.factory('Book', function($http) {
  return {
    getBooksOfUser: function(userId){
      return $http({
        method: 'GET',
        url: 'http://localhost:3000/user/?seller='+userId
      }).then(function successCallback(response) {

      }, function errorCallback(response) {

      });
    },

    getBook: function(bookId){
      return  $http({
        method: 'GET',
        url: 'http://localhost:3000/book/'+bookId
      }).then(function successCallback(response) {
        return response;
      }, function errorCallback(response) {
        return response;
      });
    },

    getBooks: function(){
      return  $http({
        method: 'GET',
        url: 'http://localhost:3000/book/'
      }).then(function successCallback(response) {
        return response;
      }, function errorCallback(response) {
        return response;
      });
    },

    addBook: function(bookParams){
      return  $http({
        method: 'POST',
        url: 'http://localhost:3000/book/',
        data: bookParams
      }).then(function successCallback(response) {
        return response;
      }, function errorCallback(response) {
        return response;
      });
    }
  }
});

'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular'
  ])
  .config(function ($routeProvider, RestangularProvider) {

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
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('MovieRestangular', function(Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setRestangularFields({
          id: '_id'
        });
      });
    })
    .factory('Movie', function(MovieRestangular) {
      return MovieRestangular.service('movie');
    })
    .factory('UserRestangular', function(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
          RestangularConfigurer.setRestangularFields({
            id: '_id'
          });
        });
      })
    .factory('User', function(UserRestangular) {
      return UserRestangular.service('user');
    })
    .factory('BookRestangular', function(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
          RestangularConfigurer.setRestangularFields({
            id: '_id'
          });
        });
      })
      .factory('Book', function(BookRestangular) {
        return BookRestangular.service('book');
      })
    ;

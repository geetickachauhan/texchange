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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
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
      .when('/movies', {
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
      .otherwise({
        redirectTo: '/'
      });
  });

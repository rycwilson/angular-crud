
angular.module('bookApp', ['bookApp.services', 'bookApp.controllers',
    'ui.router', 'ngResource'])

  // states
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
      function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
      .state('books', {
        url: '/books',
        templateUrl: '/templates/books-index.html',
        controller: 'BooksIndexCtrl'
        // resolve: ?
      })
      .state('newBook', {
        url: '/books/new',
        templateUrl: '/templates/book-new.html',
        controller: 'NewBookCtrl'
      })
      .state('showBook', {
        url: '/books/:id',
        templateUrl: '/templates/book-show.html',
        controller: 'ShowBookCtrl'
      })
      .state('editBook', {
        url: '/books/:id/edit',
        templateUrl: '/templates/book-edit.html',
        controller: 'EditBookCtrl'
      });
      // .run(function ($state) {
      //   // transition to 'books' state when app starts
      //   $state.go('books');
      // });

      // default fall back route
      $urlRouterProvider
        .when('/', '/books')
        .otherwise('/');

      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });

  }]);


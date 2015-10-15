(function () {

  angular.module('BookApp', ['ngRoute', 'ngResource'])

    // routes
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

      $routeProvider
        .when('/', {
          redirectTo: '/books'
        })
        .when('/books', {
          templateUrl: '/templates/books/index.html',
          controller: 'BooksIndexCtrl'
        })
        .when('/books/:id', {
          templateUrl: '/templates/books/show.html',
          controller: 'ResourceController'
        })
        .otherwise({
          redirectTo: '/'
        });

        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
    }])

    .controller('BooksIndexCtrl', ['$scope', 'Book', function ($scope, Book) {

      $scope.books = Book.query(function (data) {
        $scope.books = data;
      });

    }])

    .controller('ResourceController', ['$scope', '$routeParams', 'Book',
        function ($scope, $routeParams, Book) {

      $scope.book = Book.get({ id: $routeParams.id }, function (data) {
        console.log(data);
      });

    }])

    .service('Book', ['$resource', function ($resource) {
      return $resource('http://daretodiscover.herokuapp.com/books/:id');
    }]);

})();
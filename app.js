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
        .when('/books/new', {
          templateUrl: '/templates/books/new.html',
          /* if no controller given here, does it inherit from parent route?
             -> $scope.newBook binds ok
             -> BUT, $scope.addBook() won't execute unless
                controller is specified */
          controller: 'NewBookCtrl'
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

    .controller('BooksIndexCtrl', ['$scope', '$location', 'Book', function ($scope, $location, Book) {

      $scope.books = [];

      Book.query(function (data) {
        $scope.books = data;
      });



    }])

    .controller('NewBookCtrl', ['$scope', '$location', 'Book',
        function ($scope, $location, Book) {

      $scope.newBook = {};

      // $scope.addBook = function () {
      //   $scope.books.push($scope.newBook);
      //   console.log($scope.books);
      //   $scope.newBook = {};
      //   $location.path('/books');
      // };

      $scope.routeChange = function () {
        $location.path('/books/new');
      };

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

angular.module('bookApp.controllers', [])

  // Index
  .controller('BooksIndexCtrl', ['$scope', '$state', '$window',
      'Book', function ($scope, $state, $window, Book) {

    // returns a promise that will bind to view as soon as available
    $scope.books = Book.query(function (data) {
      // console.log(data)
    });

    $scope.deleteBook = function (book) {
      // if (popupService.showPopup('Are you sure?')) {
        movie.$delete(function () {
          //redirect
          $window.location.href = '/books';
        });
      // }
    };
  }])

  // New
  .controller('NewBookCtrl', ['$scope', '$state', '$stateParams', 'Book',
      function ($scope, $state, $stateParams, Book) {

    $scope.book = new Book();

    $scope.addBook = function () {
      $scope.book.$save(function () {
        $state.go('books');
      });
    };
  }])

  // Show
  .controller('ShowBookCtrl', ['$scope', '$stateParams', 'Book',
      function ($scope, $stateParams, Book) {

    $scope.book = Book.get({ id: parseInt($stateParams.id) }, function () {
      console.log(typeof($scope.book.id));
    });

  }])

  /// Edit
  .controller('EditBookCtrl', ['$scope', '$state', '$stateParams', 'Book',
      function ($scope, $state, $stateParams, Book) {

    $scope.book = Book.get({ id: parseInt($stateParams.id) });

    $scope.updateBook = function () {
      $scope.book.$update(function () {
        $state.go('books');
      });
    };

    // $scope.loadBook = function () {
    //   //Issues a GET request to /api/movies/:id to get a movie to update
    //   $scope.book = Book.get({ id: $stateParams.id });
    // };

    // $scope.loadBook(); // Load a movie which can be edited on UI

  }]);

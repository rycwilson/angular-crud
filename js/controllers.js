
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

    $scope.book = Book.get({ id: parseInt($stateParams.id, 10) }, function () {
      // console.log($scope.book);
    });

  }])

  /// Edit
  .controller('EditBookCtrl', ['$scope', '$state', '$stateParams', 'Book',
      function ($scope, $state, $stateParams, Book) {

    Book.get({ id: parseInt($stateParams.id, 10) },
      // the date will come as a string, either the year
      //   by itself or month/day/year
      // if year, will populate a text input field
      // if month/day/year, will populate a date field
      function (data) {
        var book = data;
        // check if the date is represented by year only,
        // if so assign to book.release_date_year
        var year = parseInt(book.release_date, 10);
        if (Number(year) === year && year % 1 === 0) {
          book.release_date_year = year.toString();
        }
        else {
          book.release_date = new Date (book.release_date);
        }
        $scope.book = book;
      }
    );

    $scope.updateBook = function () {
      $scope.book.$update(function () {
        $state.go('books');
      });
    };

  }]);

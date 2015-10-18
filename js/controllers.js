
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
        book.$delete(function () {
          //redirect
          $state.go('books');
        });
      // }
    };
  }])

  // New
  .controller('NewBookCtrl', ['$scope', '$state', '$filter', '$stateParams', 'Book',
      function ($scope, $state, $filter, $stateParams, Book) {

    // $scope.book (bound to the form) has release_date as date type
    // $scope.newBook converts it to string
    $scope.book = {};
    $scope.newBook = new Book();

    $scope.addBook = function () {
      $scope.newBook.author = $scope.book.author;
      $scope.newBook.title = $scope.book.title;
      $scope.newBook.image = $scope.book.image;
      // convert date to string
      $scope.newBook.release_date =
        $filter('date')($scope.book.release_date_as_date, 'longDate');
      $scope.newBook.$save(function () {
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
  .controller('EditBookCtrl', ['$scope', '$state', '$filter', '$stateParams',
      'Book', function ($scope, $state, $filter, $stateParams, Book) {

    // the resource (book) data has to go through a buffer before it's
    // assigned to $scope.book. See below...
    $scope.book = {};

    Book.get({ id: parseInt($stateParams.id, 10) },
      function (data) {
        // need to store everything in a buffer (book), so we can
        // determine which fields to display (date as string or as date)
        // before assigning to $scope.book
        var book = data;
        // data.release_date will come as a string, either the year
        // by itself or month/day/year
        // if year, insert and populate a text input field
        // if month/day/year, insert and populate a date field
        // (see _form.html)
        var year = parseInt(data.release_date, 10);
        if (Number(year) === year && year % 1 === 0) {
          // release_date is a year -> string
          book.release_date = year.toString();
        }
        else {
          // release_date is full date,
          // so give $scope.book a date type field
          book.release_date_as_date = new Date (data.release_date);
        }
        $scope.book = book;
      }
    );

    $scope.updateBook = function () {
      if ($scope.book.release_date_as_date) {
        // need to convert from date type to string
        $scope.book.release_date =
          $filter('date')($scope.book.release_date_as_date, 'longDate');
        // will presence of release_date_as_date cause a problem for PUT?
        // => no, it won't
      }
      $scope.book.$update(function () {
        $state.go('books');
      });
    };

  }]);

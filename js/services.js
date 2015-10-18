
angular.module('bookApp.services', [])

  .factory('Book', ['$resource', function ($resource) {
    // RESTful API
    return $resource('http://daretodiscover.herokuapp.com/books/:id',
        // for $put and $delete methods, :id parameter will be set to
        // id of the $resource instance, e.g.
        // $scope.book = Book.get({ id: $scope.id }, function () {
        //    // change some stuff
        //    // => { id: 4, title: "blah", author: "blah blah" }
        // }
        // $scope.book.$update
        { id: '@id' },
        // here we add custom methods to the resource class
        // invoke this method as $update (as above)
        { update: { method: 'PUT' },
          delete: { method: 'DELETE' } }
    );
  }]);


angular.module('UserModule', ['AdminModule', 'BusinessModule'])
  .controller('AuthController', ['$scope', '$http', '$element', function ($scope, $http, $element) {

    $scope.$alert = $('<div>').addClass('alert alert-danger');
    $scope.signInModel = {};

    $scope.signIn = function (user) {
      $scope.$alert.remove();

      $http.post('/signin', user)
        .success(function () {
          window.location = '/';
        })
        .error(function (errorMessage) {
          $scope.$alert.text(errorMessage).prependTo($element);
        });
    };

    $scope.signUpModel = {};
    $scope.signUpExtra = {};

    $scope.signUp = function (user) {
      $http.post('/signup', user)
        .success(function () {
          window.location = '/';
        })
        .error(function (validationError) {
          console.log(validationError);
        });
    };

    $scope.signOut = function () {
      $http.post('/signout')
        .success(function () {
          window.location = '/';
        });
    };

  }])
  .controller('HomeController', ['$scope', '$http', '$element', function ($scope, $http, $element) {

      $scope.locals = [];
      $scope.map = { center: { latitude: 40.416599610694654, longitude: -3.703838038028721 }, zoom: 18, control: {}, markers: [] };

      $http.get('/local')
        .success(function (locals) {
          $scope.locals = locals;
          $scope.locals.forEach(function (local, index) {
            var marker = {
              id: index,
              coords: {
                latitude: local.location.A,
                longitude: local.location.F
              }
            };

            $scope.map.markers.push(marker);
          });
          $scope.map.control.refresh({ latitude: 40.416599610694654, longitude: -3.703838038028721 });
        })
        .error(function (errorMessage) {
        });

      $scope.showLocal = function ($index) {
            $scope.locals.forEach(function (store, index) {
                store.active = index == $index;
            });
        };

  }]);

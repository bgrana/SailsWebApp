
angular.module('UserModule')
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

  }]);

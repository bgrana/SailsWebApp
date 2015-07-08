(function(){
  var app = angular.module('AdminModule', []);

  app.controller('UserController', [ '$scope', '$http',  function($scope , $http){
    var admin = this;
    admin.users = [];
    userModel = {};

    $http.get('/user').success( function(data){
      admin.users = data;
    });

    $scope.updateUser = function (user) {
      $http.put('/user/'+user.id, user)
        .success(function () {
          alert('User info updated');
        }).error(function(err){
          console.log(err);
        });
    };

    $scope.createUser = function (user) {
      $http.post('/user', user)
        .success(function () {
          alert('New user created');
        }).error(function(err){
          console.log(err);
        });
    };

    $scope.destroyUser = function (user) {
      $http.delete('/user'+user.id, user)
        .success(function () {
          alert('New user created');
        }).error(function(err){
          console.log(err);
        });
    };

  }]);

  app.controller('LocalController', [ '$scope', '$http', function($scope , $http){
    var admin = this;
    admin.locals = [];
    localModel = {};

    $http.get('/local').success( function(data){
      admin.locals = data;
    });

    $scope.updateLocal = function (local) {
      $http.post('/local', local)
        .success(function () {
          alert('User info updated');
        }).error(function(err){
          console.log(err);
        });
    };

  }]);

  app.controller('BusinessController', [ '$scope', '$http', function($scope , $http){
    var admin = this;
    admin.businesses = [];
    businessModel = {};

    $http.get('/business').success( function(data){
      admin.businesses = data;
    });

    $scope.updateBusiness = function (local) {
      $http.post('/local', local)
        .success(function () {
          alert('User info updated');
        }).error(function(err){
          console.log(err);
        });
    };
  }]);

})();

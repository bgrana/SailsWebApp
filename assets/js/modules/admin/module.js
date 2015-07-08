(function(){
  var app = angular.module('AdminModule', []);

  app.controller('UserController', [ '$scope', '$http',  function($scope , $http){
    var admin = this;
    admin.users = {};
    userModel = {};
    userCreateModel = {};

    $http.get('/user').success( function(data){
      data.forEach(function (data) {
        admin.users[data.id] = data;
      });
    });

    $scope.updateUser = function (user) {
      $http.put('/user/' + user.id, user)
        .success(function (data) {
          console.log(data);
        }).error(function(err){
          console.log(err);
        });
    };

    $scope.createUser = function (user) {
      $http.post('/user', user)
        .success(function (data) {
          $scope.resetCreateUserForm();
          admin.users[data.id] = data;
          console.log(data);
        }).error(function(err){
          console.log(err);
        });
    };

    $scope.destroyUser = function (user) {
      $http.delete('/user/' + user.id, user)
        .success(function (data) {
          delete admin.users[data.id];
          console.log(data);
        }).error(function(err){
          console.log(err);
        });
    };

    $scope.resetCreateUserForm = function () {
      userCreateModel = {};
    };

  }]);

  app.controller('LocalController', [ '$scope', '$http', function($scope , $http){
    var admin = this;
    admin.locals = {};
    localModel = {};

    $http.get('/local').success( function(data){
      data.forEach(function (data) {
        admin.locals[data.id] = data;
      });
    });

    $scope.updateLocal = function (local) {
      $http.put('/local/' + local.id, local)
        .success(function (data) {
          console.log(data);
        }).error(function(err){
          console.log(err);
        });
    };

  }]);

  app.controller('BusinessController', [ '$scope', '$http', function($scope , $http){
    var admin = this;
    admin.businesses = {};
    businessModel = {};

    $http.get('/business').success( function(data){
      data.forEach(function (data) {
        admin.businesses[data.id] = data;
      });
    });

    $scope.updateBusiness = function (business) {
      $http.put('/business/' + business.id, business)
        .success(function (data) {
          console.log(data);
        }).error(function(err){
          console.log(err);
        });
    };
  }]);

})();

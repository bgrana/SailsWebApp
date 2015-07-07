(function(){

  var app = angular.module('AdminModule', []);

  app.controller('UserController', [ '$scope', '$http',  function($scope , $http){
    var admin = this;
    admin.users = [];

    $http.get('/user').success( function(data){
      admin.users = data;
    });
  }]);

  app.controller('LocalController', [ '$scope', '$http', function($scope , $http){
    var admin = this;
    admin.locals = [];

    $http.get('/local').success( function(data){
      admin.locals = data;
    });
  }]);

  app.controller('BusinessController', [ '$scope', '$http', function($scope , $http){
    var admin = this;
    admin.businesses = [];

    $http.get('/business').success( function(data){
      admin.businesses = data;
    });
  }]);

})();

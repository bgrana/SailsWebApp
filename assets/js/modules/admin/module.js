(function(){

  var admin = angular.module('AdminModule', [ ]);
  var adminModule = this;

  app.controller('UserController', [ '$http', function($http){
    adminModule.users = [];

    $http.get('/users.json').success( function(data){
      adminModule.users = data;
    });

  }]);

  app.controller('LocalController', [ '$http', function($http){
    adminModule.locals = [];

    $http.get('/local.json').success( function(data){
      adminModule.locals = data;
    });

  }]);

  app.controller('BusinessController', [ '$http', function($http){
    adminModule.businesses = [];

    $http.get('/business.json').success( function(data){
      adminModule.businesses = data;
    });

  }]);


})();

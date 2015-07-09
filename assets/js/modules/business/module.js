(function () {
    var app = angular.module('BusinessModule', ['uiGmapgoogle-maps']);

    app.controller('BusinessController', ['$scope', '$http', '$element', '$interpolate', function ($scope, $http, $element, $interpolate) {
            $scope.step1Completed = false;
            $scope.createModel = {};
            $scope.storeCreateModel = {};
            $scope.step2Completed = false;

            var map = new Maps(document.getElementById('mapContainer'), document.getElementById('searchContainer'));
            map.create();

            $scope.createBusiness = function (business) {

                $http
                    .post('/business', business)
                    .success(function (data) {
                        // get id or use other attr as id.
                        $scope.business = data;
                        $scope.step1Completed = true;
                    })
                    .error(function (validationError) {
                        console.log(validationError);
                    });

            };

            $scope.createStore = function (store) {

                store.owner = $scope.business;
                store.location = map.getCoords();
                $http
                    .post('/local', store)
                    .success(function (data) {
                        $scope.resetStoreCreateForm();
                        $scope.step2Completed = true;
                    })
                    .error(function (validationError) {
                        console.log(validationError);
                    });

            };

            $scope.goDetailView = function () {
              window.location = "/business/" + $scope.business.id; 
            };

            $scope.resetCreateForm = function () {
                $scope.createModel = {};
            };

            $scope.resetStoreCreateForm = function () {
                $scope.storeCreateModel = {};
            };

        }]);

    app.controller('BusinessListController', ['$scope', '$http', '$element', '$interpolate', function ($scope, $http, $element, $interpolate) {

        $scope.businessId = $element.attr('data-id');
        $scope.map = { center: { latitude: 40.4143946, longitude: -3.8444746 }, zoom: 18, control: {} };
        
        $scope.marker = {
          id: 0
        };

        $http.get('/business/' + $scope.businessId)
            .success(function(data) {
                $scope.business = data;

                data.locals.forEach(function (store, index) {
                    store.active = index == 0;
                    //store.center = { latitude: 40.5, longitude: -3.9 }
                    store.center = { latitude: store.location.A, longitude: store.location.F };
                });
                $scope.stores = data.locals;
                $scope.map.center = $scope.stores[0].center;
                $scope.marker.coords = {
                    latitude: $scope.stores[0].center.latitude,
                    longitude: $scope.stores[0].center.longitude
                };
            })
            .error(function(data) {
            });

        $scope.showStore = function ($index) {
            $scope.stores.forEach(function (store, index) {
                store.active = index == $index;
            });
            $scope.map.control.refresh($scope.stores[$index].center);
            $scope.marker.coords = {
                latitude: $scope.stores[$index].center.latitude,
                longitude: $scope.stores[$index].center.longitude
            };
        };

    }]);


})();
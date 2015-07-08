(function () {
    var app = angular.module('BusinessModule', []);

    app.controller('BusinessController', ['$scope', '$http', '$element', '$interpolate', function ($scope, $http, $element, $interpolate) {
            $scope.step1Completed = false;
            $scope.createModel = {};
            $scope.storeCreateModel = {};
            $scope.step2Completed = false;
            var mapContainer = document.getElementById('map-container');
            var searchContainer = document.getElementById('search-container');
            var maps = new Maps(mapContainer, searchContainer);
            maps.create();

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
                store.location = maps.getCoords();
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

            $scope.resetCreateForm = function () {
                $scope.createModel = {};
            };

            $scope.resetStoreCreateForm = function () {
                $scope.storeCreateModel = {};
            };

        }]);
})();
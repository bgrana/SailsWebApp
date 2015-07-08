(function () {
    var app = angular.module('BusinessModule', []);

    app.controller('BusinessController', ['$scope', '$http', '$element', '$interpolate', function ($scope, $http, $element, $interpolate) {
            $scope.step1Completed = false;
            $scope.createModel = {};
            $scope.storeCreateModel = {};
            $scope.step2Completed = false;

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

    app.controller('BusinessListController', ['$scope', '$http', '$element', '$interpolate', function ($scope, $http, $element, $interpolate) {

        $scope.businessId = $element.attr('data-id');

        $http.get('/business/' + $scope.businessId)
            .success(function(data) {
                $scope.business = data;

                data.locals.forEach(function (store, index) {
                    store.active = index == 0;
                });
                $scope.stores = data.locals;
            })
            .error(function(data) {
            });

        $scope.showStore = function ($index) {
            $scope.stores.forEach(function (store, index) {
                store.active = index == $index;
            });
        };

    }]);


})();
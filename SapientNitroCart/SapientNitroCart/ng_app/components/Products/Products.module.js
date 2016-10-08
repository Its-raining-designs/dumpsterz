(function () {
    "use strict";

    angular.module('NitroCartApp.Products', [
        "NitroCartApp.Products.controllers",
        "NitroCartApp.Products.services",
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/Products', {
            controller: 'ProductsController',
            controllerAs: 'productsVM',
            templateUrl: 'ng_app/components/Products/Products.html',
            //resolve: {}
        });
    }

})();
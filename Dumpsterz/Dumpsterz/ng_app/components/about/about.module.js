(function () {
    "use strict";

    angular.module('dumpsterz.about', [
        "dumpsterz.about.controllers",
        "dumpsterz.about.services",
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/about', {
            controller: 'aboutController',
            controllerAs: 'aboutVM',
            templateUrl: 'ng_app/components/about/about.html',
            //resolve: {}
        });
    }

})();
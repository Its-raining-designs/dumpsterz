(function () {
    "use strict";

    angular.module('dumpsterz.works', [
        "dumpsterz.works.controllers",
        "dumpsterz.works.services",
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/works', {
            controller: 'worksController',
            controllerAs: 'worksVM',
            templateUrl: 'ng_app/components/works/works.html',
            //resolve: {}
        });
    }

})();
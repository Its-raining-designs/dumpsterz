(function () {
    "use strict";

    angular.module('diaperDumpsterApp.dumpsters', [
        "diaperDumpsterApp.dumpsters.controllers",
        "diaperDumpsterApp.dumpsters.services",
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/dumpsters', {
            controller: 'dumpstersController',
            controllerAs: 'dumpstersVM',
            templateUrl: 'ng_app/components/dumpsters/dumpsters.html',
            //resolve: {}
        });
    }

})();
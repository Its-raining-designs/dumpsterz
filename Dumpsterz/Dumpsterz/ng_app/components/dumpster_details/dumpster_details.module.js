(function () {
    "use strict";

    angular.module('diaperDumpsterApp.dumpster_details', [
        "diaperDumpsterApp.dumpster_details.controllers",
        "diaperDumpsterApp.dumpster_details.services",
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/dumpsters/:id', {
            controller: 'dumpster_detailsController',
            controllerAs: 'dumpster_detailsVM',
            templateUrl: 'ng_app/components/dumpster_details/dumpster_details.html',
            //resolve: {}
        });
    }

})();
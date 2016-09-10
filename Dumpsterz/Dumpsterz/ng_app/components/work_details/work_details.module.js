(function () {
    "use strict";

    angular.module('dumpsterz.work_details', [
        "dumpsterz.work_details.controllers",
        "dumpsterz.work_details.services",
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/works/:name', {
            controller: 'work_detailsController',
            controllerAs: 'work_detailsVM',
            templateUrl: 'ng_app/components/work_details/work_details.html',
            //resolve: {}
        });
    }

})();
(function () {
    "use strict";

    angular.module('LearningHubApp.LearningPaths', [
        "LearningHubApp.LearningPaths.controllers",
        "LearningHubApp.LearningPaths.services",
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/LearningPaths', {
            controller: 'LearningPathsController',
            controllerAs: 'learningPathVM',
            templateUrl: 'ng_app/components/LearningPaths/LearningPaths.html',
            //resolve: {}
        });
    }

})();
(function () {
    "use strict";

    angular.module('CodeCafeApp.Submissions', [
        "CodeCafeApp.Submissions.controllers",
        "CodeCafeApp.Submissions.services",
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/Submissions', {
            controller: 'SubmissionsController',
            controllerAs: 'submissionsVM',
            templateUrl: 'ng_app/components/Submissions/Submissions.html',
            //resolve: {}
        });
    }

})();
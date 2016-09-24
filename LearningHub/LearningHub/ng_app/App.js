

(function () {
    'use strict';
    var LearningHubApp = angular.module("LearningHubApp", [
                    'ngRoute',
                    'LearningHubApp.LearningPaths'
    ])
                

    LearningHubApp.config(['$routeProvider', '$compileProvider', '$locationProvider',
                      function ($routeProvider, $compileProvider, $locationProvider) {
                          $routeProvider
                            .otherwise({
                                redirectTo: '/LearningPaths'
                            });
                      }]);

    LearningHubApp.run(function ($rootScope,$window) {
        console.log("App started successfully!");
    });

})();


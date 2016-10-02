

(function () {
    'use strict';
    var CodeCafeApp = angular.module("CodeCafeApp", [
                    'ngRoute',
                    'CodeCafeApp.Submissions'
    ])
                

    CodeCafeApp.config(['$routeProvider', '$compileProvider', '$locationProvider',
                      function ($routeProvider, $compileProvider, $locationProvider) {
                          $routeProvider
                            .otherwise({
                                redirectTo: '/Submissions'
                            });
                      }]);

    CodeCafeApp.run(function ($rootScope,$window) {
        console.log("App started successfully!");
    });

})();


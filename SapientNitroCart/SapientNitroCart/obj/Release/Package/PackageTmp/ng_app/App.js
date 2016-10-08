

(function () {
    'use strict';
    var NitroCartApp = angular.module("NitroCartApp", [
                    'ngRoute',
                    'NitroCartApp.Products'
    ])
                

    NitroCartApp.config(['$routeProvider', '$compileProvider', '$locationProvider',
                      function ($routeProvider, $compileProvider, $locationProvider) {
                          $routeProvider
                            .otherwise({
                                redirectTo: '/Products'
                            });
                      }]);

    NitroCartApp.run(function ($rootScope,$window) {
        console.log("App started successfully!");
    });

})();


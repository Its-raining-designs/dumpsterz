

(function () {
    'use strict';
    var diaperDumpsterApp = angular.module("diaperDumpsterApp", [
                    'ngRoute',
                    'diaperDumpsterApp.dumpsters',
                    'diaperDumpsterApp.dumpster_details',
                ])
                .config(['$routeProvider','$compileProvider', '$locationProvider',
                      function ($routeProvider, $compileProvider, $locationProvider) {
                          $routeProvider
                            .otherwise({
                                redirectTo: '/dumpsters'
                            });
                      }]);


    diaperDumpsterApp.run(function ($route,$rootScope, ParseLoginService) {





    });

})();


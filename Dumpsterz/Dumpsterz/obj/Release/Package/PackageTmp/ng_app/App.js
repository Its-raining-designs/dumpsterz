

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


    diaperDumpsterApp.run(function ($rootScope,$window, ParseLoginService) {
        console.log("App started successfully!");


        function getCurrentUser() {
            ParseLoginService.getCurrentUser().then(function (user) {
                $window.sessionStorage.sessionToken = user.sessionToken;
                $window.sessionStorage.loggedInUser = user;
                $rootScope.User = user;
            }, function error(_errorResponse) {
                delete $window.sessionStorage.sessionToken;
                delete $window.sessionStorage.loggedInUser;
                delete $rootScope.User;
            });
        }

        //Try getting a logged in user when application is started!
        getCurrentUser();

    });

})();




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
        var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
        });
    });

})();


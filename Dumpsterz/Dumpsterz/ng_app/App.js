var dumpsterz = angular.module("dumpsterz", [
                'ngRoute',
                'dumpsterz.works',
                'dumpsterz.work_details',
                'dumpsterz.about',
            ])
            .config(['$routeProvider','$compileProvider', '$locationProvider',
                  function ($routeProvider, $compileProvider, $locationProvider) {
                      $routeProvider
                        .otherwise({
                            redirectTo: '/works'
                        });
                  }]);



dumpsterz.run(function ($route, $rootScope, $location, AppService) {

});
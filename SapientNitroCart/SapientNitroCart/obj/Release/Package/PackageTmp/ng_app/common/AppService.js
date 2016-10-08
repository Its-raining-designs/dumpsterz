

(function () {
    'use strict';
    var AppService = angular.module('NitroCartApp')
    .factory('AppService', function ($rootScope, $http, $location, $timeout) {


        return {
            ShowLoader: function (message) {

                (function () {
                    $timeout(function () {
                        $rootScope.$apply(function () {
                            $rootScope.loaderVisibility = true;
                            $rootScope.loaderText = message;
                        })
                    }, 0);
                })();
            },
            HideLoader: function () {
                (function () {
                    $timeout(function () {
                        $rootScope.$apply(function () {
                            $rootScope.loaderVisibility = false;
                        })
                    }, 0);
                })();

            },
            LoadTimer: function (time, message) {

                (function () {
                    $timeout(function () {
                        $rootScope.$apply(function () {
                            $rootScope.loaderVisibility = false;
                            $rootScope.loaderText = message;
                        })
                    }, 0);
                })();

                (function () {
                    $timeout(function () {
                        $rootScope.$apply(function () {
                            $rootScope.loaderVisibility = true;
                            $rootScope.loaderText = message;
                        })
                    }, 0);
                })();

                (function () {
                    $timeout(function () {
                        $rootScope.$apply(function () {
                            $rootScope.loaderVisibility = false;
                            $rootScope.loaderText = message;
                        })
                    }, time);
                })();
            }
        };
    })

})();
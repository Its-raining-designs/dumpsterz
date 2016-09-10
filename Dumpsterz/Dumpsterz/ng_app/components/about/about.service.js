(function () {
    angular.module('dumpsterz.about.services',[])
           .factory('aboutService', aboutService);

    aboutService.$inject = ["$timeout"];

    function aboutService($timeout) {
        var aboutService = {
        };

        return aboutService;
    }
})();
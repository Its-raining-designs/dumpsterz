(function () {
    angular.module('dumpsterz.works.services',[])
           .factory('worksService', worksService);

    worksService.$inject = ["$timeout"];

    function worksService($timeout) {
        var worksService = {
        };

        return worksService;
    }
})();
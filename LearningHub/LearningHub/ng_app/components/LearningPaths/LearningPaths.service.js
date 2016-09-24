(function () {
    angular.module('LearningHubApp.LearningPaths.services',[])
           .factory('LearningPathsService', LearningPathsService);

    LearningPathsService.$inject = ["$q", "$http", "appConstants"];

    function LearningPathsService($q, $http, appConstants) {


        var LearningPathsService = {
            fetchLearningPaths: fetchLearningPaths
        };

        return LearningPathsService;

        function fetchLearningPaths(params) {
            var def = $q.defer();

            var req = {
                method: 'GET',
                url: appConstants.LearningHubBaseURL,
                headers: {},
                params: {
                    type: 'json',
                    query: 'list_paths'
                }
            }
            
            $http(req).then(function (response, status, headers, config) {
                def.resolve({
                    LearningPaths: response.data.paths,
                    quote_available: response.data.quote_available,
                    quote_max: response.data.quote_max
                });
            }, function (arg) {
                def.reject(arg.data);
            });

            return def.promise;
        }

    }
})();
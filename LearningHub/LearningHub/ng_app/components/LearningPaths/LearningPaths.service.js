(function () {
    angular.module('LearningHubApp.LearningPaths.services',[])
           .factory('LearningPathsService', LearningPathsService);

    LearningPathsService.$inject = ["$timeout", "$q", "$http", "$timeout", "appConstants"];

    function LearningPathsService($timeout, $q, $http, $timeout, appConstants) {


        var LearningPathsService = {
            fetchLearningPaths: fetchLearningPaths,
            pushPortfolio: pushPortfolio
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
            
            $http(req).then(function (response) {
                def.resolve({
                    LearningPaths: response.data.paths
                });
            }, function (arg) {
                def.reject(arg.data);
            });

            return def.promise;
        }

        function pushPortfolio(params) {
            var def = $q.defer();

            var req = {
                method: 'GET',
                url: appConstants.LearningHubBaseURL,
                headers: {},
                params: {
                    type:'json',
                    query:'push',
                    title: params.title,
                    url: params.url,
                    tag: params.tag
                }
            }
            $http(req).then(function (response) {
                if(response.status==200&&response.data.status==403){
                    def.reject({
                        learningPath: "Error!" + response.data.message
                    });

                }else if(response.status==200&&response.data.status==200) {

                    def.resolve({
                        learningPath:  "Success!"+ response.data.message
                    });

                }else {

                    def.resolve({
                        learningPath: response.data
                    });

                }

            }, function (arg) {
                def.reject({
                    learningPath: response.data
                });
            });

            return def.promise;
        }

    }
})();
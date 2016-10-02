(function () {
    angular.module('CodeCafeApp.Submissions.services',[])
           .factory('SubmissionsService', SubmissionsService);

    SubmissionsService.$inject = ["$q", "$http", "appConstants"];

    function SubmissionsService($q, $http, appConstants) {


        var SubmissionsService = {
            fetchSubmissions: fetchSubmissions,
            fetchLanguageImages: fetchLanguageImages
        };

        return SubmissionsService;

        function fetchSubmissions(params) {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: appConstants.LearningHubBaseURL,
                headers: {},
                params: {
                    type: 'json',
                    query: 'list_submissions',
                    page: params.page
                }
            }
            
            $http(req).then(function (response, status, headers, config) {
                def.resolve({
                    Submissions: response.data.websites,
                    quote_available: response.data.quote_available,
                    quote_max: response.data.quote_max
                });
            }, function (arg) {
                def.reject(arg.data);
            });

            return def.promise;
        }

        function fetchLanguageImages(params) {
            var def = $q.defer();

            var req = {
                method: 'GET',
                url: appConstants.LearningHubBaseURL,
                headers: {},
                params: {
                    type: 'json',
                    query: 'list_compiler_image'
                }
            }

            $http(req).then(function (response, status, headers, config) {
                def.resolve({
                    data: response.data
                });
            }, function (arg) {
                def.reject(arg.data);
            });

            return def.promise;
        }

    }
})();
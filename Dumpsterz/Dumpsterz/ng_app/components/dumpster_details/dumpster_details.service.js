(function () {
    angular.module('diaperDumpsterApp.dumpster_details.services',[])
           .factory('dumpster_detailsService', dumpster_detailsService);

    dumpster_detailsService.$inject = ["$timeout","$q","$http"];

    function dumpster_detailsService($timeout, $q, $http) {

        var baseURL = "https://api.parse.com/1/classes/";


        var dumpster_detailsService = {
            getDumpsterInDetail:getDumpsterInDetail,
            getDumpsterComments: getDumpsterComments,
            commentOnDumpster: commentOnDumpster
        };

        return dumpster_detailsService;

        function getDumpsterInDetail(dumpsterId) {
            var def = $q.defer();

            $http.get(baseURL + "location/" + dumpsterId, {
                headers: ParseHeaders
            }).then(function (response) {
                def.resolve({
                    dumpster: response.data
                });
            }, function (arg) {
                def.reject(arg.data.error);
            });

            return def.promise;
        }

        function getDumpsterComments(dumpsterId) {
            var def = $q.defer();

            var req = {
                method: 'GET',
                url: baseURL + 'review',
                headers: ParseHeaders,
                params: {
                    where: {
                        location:{
                            __type: "Pointer",
                            className: "location",
                            objectId: dumpsterId
                        }
                    }
                }
            }

            $http(req).then(function (response) {
                def.resolve({
                    comments: response.data.results
                });
            }, function (arg) {
                def.reject(arg.data.error);
            });

            return def.promise;
        }

        function commentOnDumpster(comment,positive, dumpsterId) {
            var def = $q.defer();

            var req = {
                method: 'POST',
                url: baseURL + 'review',
                headers: ParseHeaders,
                data: {
                    comment: comment,
                    location: {
                        __type: "Pointer",
                        className: "location",
                        objectId: dumpsterId
                    },
                    positive: positive
                }
            }

            $http(req).then(function (response) {
                def.resolve({
                    result: response
                });
            }, function (arg) {
                def.reject(arg.data.error);
            });
            return def.promise;
        }
    }
})();
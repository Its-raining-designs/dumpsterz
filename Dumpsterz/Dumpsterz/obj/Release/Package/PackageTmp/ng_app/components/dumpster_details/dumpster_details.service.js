(function () {
    angular.module('diaperDumpsterApp.dumpster_details.services',[])
           .factory('dumpster_detailsService', dumpster_detailsService);

    dumpster_detailsService.$inject = ["$timeout", "$q", "$http", "appConstants"];

    function dumpster_detailsService($timeout, $q, $http, appConstants) {


        var dumpster_detailsService = {
            getDumpsterInDetail:getDumpsterInDetail,
            getDumpsterComments: getDumpsterComments,
            commentOnDumpster: commentOnDumpster
        };

        return dumpster_detailsService;

        function getDumpsterInDetail(dumpsterId) {
            var def = $q.defer();

            $http.get(appConstants.ParseBaseURL + "location/" + dumpsterId, {
                headers: appConstants.ParseHeaders
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
                url: appConstants.ParseBaseURL + 'review',
                headers: appConstants.ParseHeaders,
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
                url: appConstants.ParseBaseURL + 'review',
                headers: appConstants.ParseHeaders,
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
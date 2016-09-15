(function () {
    angular.module('diaperDumpsterApp.dumpsters.services',[])
           .factory('dumpstersService', dumpstersService);

    dumpstersService.$inject = ["$timeout", "$q", "$http", "$timeout", "appConstants"];

    function dumpstersService($timeout, $q, $http, $timeout, appConstants) {


        var dumpstersService = {
            getDumpstersInBox: getDumpstersInBox,
            getDumpstersInRadius: getDumpstersInRadius,
            
        };

        return dumpstersService;


        function getDumpstersInBox(positions) {
            var def = $q.defer();

            var req = {
                method: 'GET',
                url: appConstants.ParseBaseURL+'location',
                headers: appConstants.ParseHeaders,
                params: {
                    where: {
                        geo: {
                            $within:
                                {
                                    $box: [
                                        { __type: "GeoPoint", latitude: positions.pos1.lat, longitude: positions.pos1.lng },
                                        { __type: "GeoPoint", latitude: positions.pos2.lat, longitude: positions.pos2.lng }
                                    ]
                                }
                        }
                    }
                }
            }

            $http(req).then(function (response) {
                def.resolve({
                    dumpsters: response.data.results
                });
            }, function (arg) {
                def.reject(arg);
            });
            return def.promise;
        }

        function getDumpstersInRadius(positions) {
            var def = $q.defer();

            var req = {
                method: 'GET',
                url: appConstants.ParseBaseURL + 'location',
                headers: appConstants.ParseHeaders,
                params: {
                    where: {
                        geo: {
                            $nearSphere: {
                                __type: "GeoPoint", latitude: positions.lat, longitude: positions.lng
                            },
                            $maxDistanceInKilometers: positions.radii
                        }
                    }
                }
            }
            $http(req).then(function (response) {
                def.resolve({
                    dumpsters: response.data.results
                });
            }, function (arg) {
                def.reject(arg.data.error);
            });

            return def.promise;
        }


    }
})();
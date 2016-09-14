(function () {
    angular.module('diaperDumpsterApp.dumpsters.services',[])
           .factory('dumpstersService', dumpstersService);

    dumpstersService.$inject = ["$timeout","$q","$http","$timeout"];

    function dumpstersService($timeout, $q, $http, $timeout) {

        var baseURL = "https://api.parse.com/1/classes/";

        var dumpstersService = {
            getDumpstersInBox: getDumpstersInBox,
            getDumpstersInRadius: getDumpstersInRadius,
            
        };

        return dumpstersService;


        function getDumpstersInBox(positions) {
            var def = $q.defer();

            var req = {
                method: 'GET',
                url: baseURL+'location',
                headers: ParseHeaders,
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
                url: baseURL + 'location',
                headers: ParseHeaders,
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
                def.reject(arg);
            });

            return def.promise;
        }


    }
})();
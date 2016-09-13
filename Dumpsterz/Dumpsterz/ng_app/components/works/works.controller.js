(function () {
    "use strict";
    angular.module('dumpsterz.works.controllers', [])
            .controller('worksController', worksController);

    worksController.$inject = ['$rootScope', '$scope', '$route', '$location', '$timeout', '$interval', 'AppService','$http', '$q'];

    function worksController($rootScope, $scope, $route, $location, $timeout, $interval, AppService,$http, $q) {
        var _this = this;
        _this.AppService=AppService;

        (function() {            
            AppService.LoadTimer(1500);
        })();

        window.scrollTo(0,0);       


        //AppService.fetchData().then(function (data) {
        //    _this.allWorks = data;
        //}, function error(e) {
        //});

        _this.goToDetails = function(name) {
            $location.url('/works/' + name)
        }
        var mymap = L.map('mapid').setView([51.505, -0.09], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hpbjJrbSIsImEiOiJjaXQxNXo4bTEwb2xxMzBxcGJtb3d3cGpzIn0.cDV_m7WudjUP1qKE6gBTEg', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            minZoom:2,
            id: 'your.mapbox.project.id',
            accessToken: 'your.mapbox.public.access.token'
        }).addTo(mymap);
    }

})();
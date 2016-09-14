(function () {
    "use strict";
    angular.module('diaperDumpsterApp.dumpster_details.controllers', [])
            .controller('dumpster_detailsController', dumpster_detailsController);

    dumpster_detailsController.$inject = ['$rootScope', '$scope', '$route', '$routeParams', '$location', '$timeout', '$interval', 'AppService', 'dumpster_detailsService'];

    function dumpster_detailsController($rootScope, $scope, $route, $routeParams, $location, $timeout, $interval, AppService, dumpster_detailsService) {

        var _this = this;
        _this.AppService = AppService;
        _this.getDumpsterComments = getDumpsterComments;
        _this.openReviewForm = openReviewForm;
        _this.getCommentsCount = getCommentsCount;
        _this.commitComment = commitComment;

        //Atrifictial Wait
        AppService.LoadTimer(1500);

        window.scrollTo(0, 0);

        var MapIconTemplate = L.Icon.extend({
            options: {
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            }
        });

        //Initializing Map and setting View to Netherlands by default
        var myStaticMap = L.map('staticmap', {
            zoomControl: false
        }).setView([52.097340, 5.332694], 8);


        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hpbjJrbSIsImEiOiJjaXQxNXo4bTEwb2xxMzBxcGJtb3d3cGpzIn0.cDV_m7WudjUP1qKE6gBTEg', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            minZoom: 2,
            id: 'your.mapbox.project.id',
            accessToken: 'your.mapbox.public.access.token'
        }).addTo(myStaticMap);

        

        function getDumpsterInDetail() {
            var promiseObj = dumpster_detailsService.getDumpsterInDetail($routeParams.id);
            promiseObj.then(function success(data) {

                _this.thisDumpster = data.dumpster;

                myStaticMap.setView([_this.thisDumpster.geo.latitude, _this.thisDumpster.geo.longitude], 13);

                var dumpsterIcon = new MapIconTemplate({ iconUrl: 'Images/current-location.png' });
                L.marker([_this.thisDumpster.geo.latitude, _this.thisDumpster.geo.longitude], { icon: dumpsterIcon })
                    .addTo(myStaticMap)
                    .bindPopup("<b><h5>" + _this.thisDumpster.name + "</h5></b>"
                        + "<br>" +
                        "<i>Address: " + _this.thisDumpster.address + "</i>"
                        + "<br>" +
                        "<i>City: " + _this.thisDumpster.city + "</i> ")
                    .openPopup();

                getDumpsterComments();
            },
            function error() {
                Materialize.toast("Couldn't find dumpster!", 4000, "red")
                $location.url('/dumpsters')
            });
        }

        function getDumpsterComments() {
            var promiseObj = dumpster_detailsService.getDumpsterComments($routeParams.id);
            promiseObj.then(function success(data) {
                _this.dumpsterComments = data.comments;
            },
            function error(response) {
                Materialize.toast(response, 4000, "red")
            });
        }

        
        function openReviewForm() {
            $('#comment_modal').openModal();
        }

        function getCommentsCount(val) {
            if (_this.dumpsterComments) {
                return _this.dumpsterComments.filter(function (c) {
                    return c.positive == val
                }).length;
            }
            else {
                return 0;
            }
        }

        function commitComment(like) {

            var promiseObj = dumpster_detailsService.commentOnDumpster(_this.comment, like,$routeParams.id);
            promiseObj.then(function success(data) {
                $('#comment_modal').closeModal();
                Materialize.toast("Successfully commented on the dumpster!", 4000, "green")
                getDumpsterComments();
            },
            function error() {
                Materialize.toast("Error commenting on the dumpster!", 4000,"red")
            });
        }


        //Getting the Dumpster in Detail when Page is loaded
        getDumpsterInDetail();

    }

})();
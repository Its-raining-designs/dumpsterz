(function () {
    "use strict";
    angular.module('diaperDumpsterApp.dumpsters.controllers', [])
            .controller('dumpstersController', dumpstersController);

    dumpstersController.$inject = ['$rootScope', '$scope', '$route', '$location', '$timeout', '$interval', 'AppService', 'dumpstersService', 'ParseLoginService'];

    function dumpstersController($rootScope, $scope, $route, $location, $timeout, $interval, AppService, dumpstersService, ParseLoginService) {
        var _this = this;
        window.scrollTo(0, 0);

        _this.AppService=AppService;
        _this.gotoCurrentLocation = gotoCurrentLocation;
        _this.fitWorld = fitWorld;

        AppService.LoadTimer(1500);

        //Initializing Map and setting View to Netherlands by default
        var activeMap = L.map('activteMap', {
            zoomControl: false
        }).setView([52.097340, 5.332694], 8);

        var MarkersArray = [];
        var zoomRadius = {2: 10000,3: 7500,4: 3000,5: 2000,6: 1000,7: 500,8: 200,
            9: 100,10: 45,11: 25,12: 12.5,13: 6.5,14: 2.5,15: 1,
            16: 0.5,17: 0.25,18: 0.15,
        }

        activeMap.on('click', onMapClick);
        activeMap.on('dragend', function (e) {
            var currentPoint = activeMap.getCenter();
            var circle = L.circle([currentPoint.lat, currentPoint.lng],  zoomRadius[activeMap.getZoom()]*1000).addTo(activeMap);
            MarkersArray.push(circle);
            getDumpsters();
        });
        activeMap.on('zoomend', function (e) {
            var currentPoint = activeMap.getCenter();
            var circle = L.circle([currentPoint.lat, currentPoint.lng], zoomRadius[activeMap.getZoom()] * 1000).addTo(activeMap);
            MarkersArray.push(circle);
            getDumpsters();
        });

        //add zoom control with your options
        L.control.zoom({
            position: 'bottomright'
        }).addTo(activeMap);
        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hpbjJrbSIsImEiOiJjaXQxNXo4bTEwb2xxMzBxcGJtb3d3cGpzIn0.cDV_m7WudjUP1qKE6gBTEg', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            minZoom: 2,
            id: 'your.mapbox.project.id',
            accessToken: 'your.mapbox.public.access.token'
        }).addTo(activeMap);


        var MapIconTemplate = L.Icon.extend({
            options: {
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            }
        });

        
       
        

        function onMapClick(e) {
            var circle = L.circle([e.latlng.lat, e.latlng.lng], zoomRadius[activeMap.getZoom()] * 1000).addTo(activeMap);
            MarkersArray.push(circle);
            var positions = {
                lat: e.latlng.lat,
                lng: e.latlng.lng ,
                radii: zoomRadius[activeMap.getZoom()]
            }
            $timeout(function () {
                getDumpstersInRadius(positions)
            }, 0);
        }

        function fitWorld() {
            activeMap.fitWorld();
        }

        function gotoCurrentLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {

                    activeMap.setView([position.coords.latitude, position.coords.longitude], 13);

                    var MyLocation = new MapIconTemplate({ iconUrl: 'Images/current-location.png' })


                    L.marker([position.coords.latitude, position.coords.longitude], { icon: MyLocation }).addTo(activeMap);
                    var circle = L.circle([position.coords.latitude, position.coords.longitude], 1000, {
                        color: '#00bcd4',
                        fillColor: '#00bcd4',
                        fillOpacity: 0.1
                    }).addTo(activeMap);
                    circle.bindPopup("Current approximate Location!");

                }, function error(msg) { }, { maximumAge: 600000, timeout: 5000, enableHighAccuracy: true });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }

        
        

        function getDumpstersInRadius(positions) {

            var promiseObj = dumpstersService.getDumpstersInRadius(positions);
            promiseObj.then(function success(data) {

                if (data.dumpsters.length == 0) {
                    
                   Materialize.toast("No dumpsters found in " + zoomRadius[activeMap.getZoom()] + " KM radius!", 4000)
                }
                else {
                   Materialize.toast("Found " + data.dumpsters.length + " dumpsters in " + zoomRadius[activeMap.getZoom()] + " KM radius!", 4000,"blue")
                }

                MarkersArray.map(function (m) {
                    activeMap.removeLayer(m);
                })

                data.dumpsters.map(function (dum) {
                    var marker = L.marker([dum.geo.latitude, dum.geo.longitude]).addTo(activeMap);
                    marker.bindPopup("<b><h5>" + dum.name + "</h5></b>"
                        + "<br>" +
                        "<i>Address: " + dum.address + "</i>"
                        + "<br>" +
                        "<i>City: " + dum.city + "</i> "
                        + "<br>" +
                        "<a href='#/dumpsters/" + dum.objectId + "' class='explore-btn'>Explore this location<i class='material-icons explore-icon'>explore</i></a>");
                    MarkersArray.push(marker);
                })
            },
            function error(err) {
                Materialize.toast(err, 4000, 'red');
                MarkersArray.map(function (m) {
                    activeMap.removeLayer(m);
                })
            });
        }
        
        function getDumpstersInBox() {
            var currentBox = activeMap.getBounds();

            var positions = {
                pos1: { lat: currentBox._northEast.lat, lng: currentBox._northEast.lng },
                pos2: { lat: currentBox._southWest.lat, lng: currentBox._southWest.lng },
            }

            var promiseObj = dumpstersService.getDumpstersInBox(positions);
            promiseObj.then(function success(data) {
                debugger;
                data.dumpsters.map(function (dum) {
                    var marker = L.marker([dum.geo.latitude, dum.geo.longitude]).addTo(activeMap);
                    marker.bindPopup("<b><h5>" + dum.name + "</h5></b>"
                        + "<br>" +
                        "<i>Address: " + dum.address + "</i>"
                        + "<br>" +
                        "<i>City: " + dum.city + "</i> "
                        + "<br>" +
                        "<a href='#/dumpsters/" + dum.objectId + "' class='explore-btn'>Explore this location<i class='material-icons explore-icon'>explore</i></a>");
                    MarkersArray.push(marker);

                })
            },
            function error(err) {
                Materialize.toast(err, 4000, 'red');
            });
        }

        function getDumpsters() {
            var currentPoint = activeMap.getCenter();
            var positions = {
                lat: currentPoint.lat,
                lng: currentPoint.lng ,
                radii: zoomRadius[activeMap.getZoom()]
            }

            getDumpstersInRadius(positions)
            
        }

        //Try and getting user's current location on page load
        gotoCurrentLocation();

    }

})();
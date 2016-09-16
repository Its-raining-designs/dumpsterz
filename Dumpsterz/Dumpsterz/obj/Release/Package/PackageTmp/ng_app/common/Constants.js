

(function () {
    'use strict'
    var constants = angular.module("diaperDumpsterApp")
    .constant('appConstants', {

        ParseHeaders : {
            "x-parse-application-id": "R8jG6ChCSOGxvB4UWjcMMlEMuloVjoVLo4mS2xkD",
            "x-parse-rest-api-key": "8GjcnO3gOdaIE41Nl9Y2juLEQgiNvHVdUM1aZoxF",
            "x-parse-revocable-session": "1"
        },

    ParseBaseURL : "https://api.parse.com/1/classes/",
    MapBoxTileLayerURL : 'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hpbjJrbSIsImEiOiJjaXQxNXo4bTEwb2xxMzBxcGJtb3d3cGpzIn0.cDV_m7WudjUP1qKE6gBTEg',
    NetherlandsLatLng: [52.097340, 5.332694],

    });
})();
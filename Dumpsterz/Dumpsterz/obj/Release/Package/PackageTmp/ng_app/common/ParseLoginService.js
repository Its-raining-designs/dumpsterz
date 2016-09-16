// create the angular module
(function () {
    'use strict';

    var AppService = angular.module('diaperDumpsterApp')
    .factory('ParseLoginService', function ($http, $q, $window, appConstants) {

        var ParseBaseURL = "https://api.parse.com/1/";

        return {
            login: login,
            logout:logout,
            signup: signup,
            getCurrentUser: getCurrentUser
        }


        function login(username,password) {
            var def = $q.defer();

            $http.get(ParseBaseURL+"login", {
                headers: appConstants.ParseHeaders,
                params: {
                    "username": username,
                    "password": password
                }
            }).then(function (response) {
                def.resolve(response.data);
            }, function (response) {
                def.reject(response.data);
            });

            return def.promise;
  
        }

        function signup(email,username,password) {

            var def = $q.defer();

            var req = {
                method: 'POST',
                url: appConstants.ParseBaseURL+'users',
                headers: appConstants.ParseHeaders,
                data: {
                    username: username,
                    password: password,
                    email: email
                }
            }

            $http(req).then(function (response) {
                def.resolve(response);
            }, function (response) {
                def.reject(response.data.error);
            });
            return def.promise;
        }

        function logout() {

            var def = $q.defer();
            var req = {
                method: 'POST',
                url: ParseBaseURL + 'logout',
                headers: {
                    "x-parse-application-id": "R8jG6ChCSOGxvB4UWjcMMlEMuloVjoVLo4mS2xkD",
                    "x-parse-rest-api-key": "8GjcnO3gOdaIE41Nl9Y2juLEQgiNvHVdUM1aZoxF",
                    "x-parse-session-token": $window.sessionStorage.sessionToken
                }

            }

            $http(req).then(function (response) {
                def.resolve(response.data);
            }, function (response) {
                def.reject(response.data);
            });
            return def.promise;
        }


        function getCurrentUser() {
            var def = $q.defer();

            $http.get(ParseBaseURL + "users/me", {
                headers: {
                    "x-parse-application-id": "R8jG6ChCSOGxvB4UWjcMMlEMuloVjoVLo4mS2xkD",
                    "x-parse-rest-api-key": "8GjcnO3gOdaIE41Nl9Y2juLEQgiNvHVdUM1aZoxF",
                    "x-parse-session-token": $window.sessionStorage.sessionToken
                }
            }).then(function (response) {
                def.resolve(response.data);
            }, function (response) {
                def.reject(response.data);
            });

            return def.promise;

        }


    })
})();
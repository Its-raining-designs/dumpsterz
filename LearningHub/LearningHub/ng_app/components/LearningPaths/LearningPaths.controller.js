(function () {
    "use strict";
    angular.module('LearningHubApp.LearningPaths.controllers', [])
            .controller('LearningPathsController', LearningPathsController);

    LearningPathsController.$inject = ['$rootScope', '$scope', '$route', '$location', '$timeout', '$interval', 'AppService', 'LearningPathsService', 'appConstants'];

    function LearningPathsController($rootScope, $scope, $route, $location, $timeout, $interval, AppService, LearningPathsService, appConstants) {
        var _this = this;
        _this.LayoutClass = 'grid';
        _this.newPortfolio = {
            title: '',
            url: '',
            tag: ''
        }
        _this.query = "";

        window.scrollTo(0, 0);
        _this.AppService = AppService;
        _this.fetchLearningPaths = fetchLearningPaths;
        _this.pushPortfolio = pushPortfolio;
        _this.openPushPopUp = openPushPopUp;
        _this.setLayout = setLayout;
        _this.setLike = setLike;
        _this.getLikes = getLikes;

        AppService.LoadTimer(1500);


        function fetchLearningPaths() {
            var promiseObj = LearningPathsService.fetchLearningPaths();
            promiseObj.then(function success(data) {
                
                _this.LearningPaths = data.LearningPaths;

                var dataForAutocomplete = {}
                _this.LearningPaths.map(function (d) {
                    dataForAutocomplete[d.title] = "http://placehold.it/250x250";
                    dataForAutocomplete[d.url_address] = "http://placehold.it/250x250";
                    dataForAutocomplete[d.tag] = "http://placehold.it/250x250";
                });
                $('input.autocomplete').autocomplete({
                    data: dataForAutocomplete
                });
            },
            function error() {
                Materialize.toast("Couldn't load LearningPaths!", 4000, "red")
            });
        }
        
        function pushPortfolio() {

            if (_this.newPortfolio.title == "") {
                Materialize.toast("Enter a valid Ticket for the Portfolio", 3000, "red");
                return;
            }
            else if (_this.newPortfolio.url == "") {
                Materialize.toast("Enter a Valid URL", 3000, "red");
                return;
            }
            else if (_this.newPortfolio.tag == "") {
                Materialize.toast("Enter a tag", 3000, "red");
                return;
            }
            
            var promiseObj = LearningPathsService.pushPortfolio(_this.newPortfolio);
            promiseObj.then(function success(data) {
                $('#LearningHub-modal').closeModal();
                Materialize.toast("Successfully executed!" + JSON.stringify(data), 4000, "cyan");
                _this.fetchLearningPaths();
            },
            function error(data) {
                Materialize.toast(JSON.stringify(data), 10000, "red")
            });
        }

        function openPushPopUp() {
            _this.newPortfolio = {
                title: '',
                url: '',
                tag:''
            }
            $('#LearningHub-modal').openModal();
        }

        function setLayout(layout) {
            _this.LayoutClass = layout;
        }

        function setLike(learningPath) {
            
            learningPath.likes = 0;
            learningPath.likes = localStorage.getItem(learningPath.url_address);
            if (learningPath.likes == null) {
                learningPath.likes = 0;
            }
            learningPath.likes = parseInt(learningPath.likes) + 1;
            localStorage.setItem(learningPath.url_address, learningPath.likes);
        }
        function getLikes(learningPath) {
            
            learningPath.likes = 0;
            learningPath.likes = localStorage.getItem(learningPath.url_address);
            if (learningPath.likes == null) {
                learningPath.likes = 0;
            }
            return learningPath.likes;

        }

        fetchLearningPaths();

    }

})();
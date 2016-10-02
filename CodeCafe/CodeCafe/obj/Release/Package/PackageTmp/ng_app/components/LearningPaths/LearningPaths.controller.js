(function () {
    "use strict";
    angular.module('LearningHubApp.LearningPaths.controllers', [])
            .controller('LearningPathsController', LearningPathsController);

    LearningPathsController.$inject = ['$timeout','AppService', 'LearningPathsService', 'appConstants'];

    function LearningPathsController($timeout, AppService, LearningPathsService, appConstants) {
        var _this = this;
        _this.LayoutClass = 'grid';
        _this.query = "";

        _this.sortByList = [
            { category: "likes", display:"Likes", icon: "thumb_up" ,selected:"true"},
            { category: "dislikes", display: "Dislikes", icon: "thumb_down", selected: "false" },
            { category: "learner", display: "Learners", icon: "people", selected: "false" },
            { category: "hours", display: "Duration", icon: "schedule", selected: "false" }
        ];

        
        _this.AppService = AppService;
        _this.fetchLearningPaths = fetchLearningPaths;
        _this.setLayout = setLayout;
        _this.setLike = setLike;
        _this.getLikes = getLikes;
        _this.sortList = sortList;
        //Aritificial wait
        AppService.LoadTimer(1500);


        function fetchLearningPaths() {
            var promiseObj = LearningPathsService.fetchLearningPaths();
            promiseObj.then(function success(data) {
                
                _this.LearningPaths = data.LearningPaths;

                var dataForAutocomplete = {}
                _this.LearningPaths.map(function (d) {
                    var tags = d.tags.split(",").map(function (tag) {
                        dataForAutocomplete[tag] = "http://placehold.it/250x250";
                    })
                    
                });
                $('input.autocomplete').autocomplete({
                    data: dataForAutocomplete
                });
            },
            function error() {
                Materialize.toast("Couldn't load LearningPaths!", 4000, "red")
            });
        }

        function setLayout(layout) {
            _this.LayoutClass = layout;
        }

        function setLike(learningPath,vote) {
            
            learningPath.likes = 0;
            learningPath.likes = localStorage.getItem("like_"+learningPath.id);
            if (learningPath.likes == null) {
                learningPath.likes = 0;
            }

            learningPath.dislikes = 0;
            learningPath.dislikes = localStorage.getItem("dislike_" + learningPath.id);
            if (learningPath.dislikes == null) {
                learningPath.dislikes = 0;
            }

            if (vote) {
                learningPath.likes = parseInt(learningPath.likes) + 1;
                localStorage.setItem("like_" + learningPath.id, learningPath.likes);
            }
            else {
                learningPath.dislikes = parseInt(learningPath.dislikes) + 1;
                localStorage.setItem("dislike_" + learningPath.id, learningPath.dislikes);
            }
            
            
        }

        function getLikes(learningPath,vote) {
            
            if (vote) {
                learningPath.likes = 0;
                learningPath.likes = localStorage.getItem("like_" + learningPath.id);
                if (learningPath.likes == null) {
                    learningPath.likes = 0;
                }
                return learningPath.likes;
            }
            else {
                learningPath.dislikes = 0;
                learningPath.dislikes = localStorage.getItem("dislike_" + learningPath.id);
                if (learningPath.dislikes == null) {
                    learningPath.dislikes = 0;
                }
                return learningPath.dislikes;
            }



        }


        function sortList(sortItem) {

            var elmnt = document.getElementById("LearningPaths-scroll");
            elmnt.scrollTop = 0;

            AppService.ShowLoader();
            $timeout(function () {
                _this.LearningPaths.sort(function (a, b) {
                    return parseInt(b[sortItem.category]) - parseInt(a[sortItem.category]);
                })
                AppService.HideLoader();
            },500)


        }

        fetchLearningPaths();

    }

})();
(function () {
    "use strict";
    angular.module('CodeCafeApp.Submissions.controllers', [])
            .controller('SubmissionsController', SubmissionsController);

    SubmissionsController.$inject = ['$timeout','AppService', 'SubmissionsService', 'appConstants'];

    function SubmissionsController($timeout, AppService, SubmissionsService, appConstants) {
        var _this = this;
        _this.LayoutClass = 'grid';
        _this.query = "";

        _this.filterByList = [
            { category: "accepted", display: "Accepted", icon: "thumb_up", selected: "false" },
            { category: "skipped", display: "Skipped", icon: "thumb_down", selected: "false" },
            { category: "exceeded", display: "Memmory/Time exceeded", icon: "thumb_down", selected: "false" },
            { category: "runtime", display: "Runtime/Compilation error", icon: "thumb_down", selected: "false" },
            { category: "wrong", display: "Wrong answer", icon: "thumb_down", selected: "false" }
        ];
        _this.pageinationIndexs = []
        
        _this.AppService = AppService;
        _this.fetchSubmissions = fetchSubmissions;
        _this.setLayout = setLayout;
        _this.filterList = filterList;
        _this.goFullScreen = goFullScreen;
        _this.goToPage = goToPage;
        //Aritificial wait
        AppService.LoadTimer(1500);


        for (var i = 1; i <= 1347; i++) {
            if (i==1) {
                _this.pageinationIndexs.push({ index: i, active: true });
            }
            else {
                _this.pageinationIndexs.push({ index: i, active: false });
            }
           
        }


        function fetchSubmissions(params) {
            AppService.ShowLoader();
            var promiseObj = SubmissionsService.fetchSubmissions(params);
            promiseObj.then(function success(data) {
                
                _this.Submissions = data.Submissions;

                _this.Submissions.map(function (sub) {
                    sub.isAvail = true;
                });

                $timeout(function () {
                    $('.tooltipped').tooltip({ delay: 50 });
                },1000)
                var dataForAutocomplete = {};
                AppService.HideLoader();
            },
            function error() {
                Materialize.toast("Couldn't load Submissions!", 4000, "red")
                AppService.HideLoader();
            });
        }

        function fetchLanguageImages() {
            var promiseObj = SubmissionsService.fetchLanguageImages();
            promiseObj.then(function success(response) {
                _this.LanguageImages = {};
                response.data.map(function (item) {
                    _this.LanguageImages[item.language] = item.icon;
                });                
            },
            function error() {
                Materialize.toast("Couldn't load Submissions!", 4000, "red")
            });
        }
        


        function setLayout(layout) {
            _this.LayoutClass = layout;
        }


        function goFullScreen(elem) {
            var codeElement = elem.currentTarget.parentElement.nextElementSibling.childNodes[5].firstElementChild
            if (screenfull.enabled) {
                screenfull.request(codeElement);
            }
        }

        function goToPage(page,evt) {
            _this.pageinationIndexs.map(function (pg) {pg.active = false});
            page.active = true;

            var elmnt = document.getElementById("Submissions-scroll");
            elmnt.scrollTop = 0;

            var params = {
                page: page.index
            }

            var myElement = evt.currentTarget;
            var topPos = myElement.offsetTop;
            document.getElementById('pagination-container').scrollTop = topPos-8;
            $timeout(function () {
                fetchSubmissions(params);
            },100)

        }


        function filterList(sortItem) {
            var elmnt = document.getElementById("Submissions-scroll");
            elmnt.scrollTop = 0;

            AppService.ShowLoader();
            $timeout(function () {

                var filterCategories = _this.filterByList.filter(function (fL) {
                                            return fL.selected == true;
                                        })
                                        .map(function (c) {
                                            return c.category;
                                        })
                _this.Submissions.map(function (sub) {
                    var isAvailFlag = false;

                    if (filterCategories.length!=0) {
                        filterCategories.map(function (cat) {
                            if (sub.compiler_status.toLowerCase().indexOf(cat) != -1) {
                                isAvailFlag = true;
                            }
                        });
                    }
                    else {
                        isAvailFlag = true;
                    }


                    sub.isAvail = isAvailFlag;

                })
                AppService.HideLoader();
            },500)


        }

        fetchSubmissions({page:1});
        fetchLanguageImages();
    }

})();
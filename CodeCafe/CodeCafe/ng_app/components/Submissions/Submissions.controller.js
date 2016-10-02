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
            { category: "skipped", display: "Skipped", icon: "swap_horiz", selected: "false" },
            { category: "exceeded", display: "Memmory/Time exceeded", icon: "timer_off", selected: "false" },
            { category: "runtime", display: "Runtime/Compilation error", icon: "rotate_left", selected: "false" },
            { category: "wrong", display: "Wrong answer", icon: "clear", selected: "false" }
        ];
        _this.pageinationIndexs = []
        
        _this.AppService = AppService;
        _this.fetchSubmissions = fetchSubmissions;
        _this.setLayout = setLayout;
        _this.filterList = filterList;
        _this.goFullScreen = goFullScreen;
        _this.goToPage = goToPage;


        for (var i = 1; i <= 1347; i++) {
            if (i==1) {
                _this.pageinationIndexs.push({ index: i, active: true });
            }
            else {
                _this.pageinationIndexs.push({ index: i, active: false });
            }
           
        }

        /**
         * Fetches submission based of filter
         * @param {params} page number
         */
        function fetchSubmissions(params) {
            AppService.ShowLoader();
            var promiseObj = SubmissionsService.fetchSubmissions(params);
            promiseObj.then(function success(data) {
                
                _this.Submissions = data.Submissions;

                _this.Submissions.map(function (sub) {
                    sub.isAvail = true;
                });
                filterList();

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

        /**
         * Fetches Language Images
         * @param {params} page number
         */
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
        

        /**
         * Set Grid or List Layout
         * @param {layout} 'list' or 'grid'
         */
        function setLayout(layout) {
            _this.LayoutClass = layout;
        }

        /**
         * Code goes Full-SCreen
         * @param {element} element which got clicked
         */
        function goFullScreen(elem) {
            var codeElement = elem.currentTarget.parentElement.nextElementSibling.childNodes[5].firstElementChild
            if (screenfull.enabled) {
                screenfull.request(codeElement);
            }
        }

        /**
         * Go To for Pgination
         * @param {page} page object
         */
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
            },300)

        }

        /**
         * Filters the current Submissions
         */
        function filterList() {
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


        //Initial page setup with data
        fetchSubmissions({page:1});
        fetchLanguageImages();
    }

})();
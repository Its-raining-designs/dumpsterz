(function () {
    "use strict";
    angular.module('NitroCartApp.Products.controllers', [])
            .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['$timeout','AppService', 'ProductsService', 'appConstants'];

    function ProductsController($timeout, AppService, ProductsService, appConstants) {
        var _this = this;
        _this.LayoutClass = 'grid';
        _this.query = "";

        _this.sortByList = [
            { category: "likes", display: "Likes", icon: "thumb_up", selected: "true" },
            { category: "dislikes", display: "Dislikes", icon: "thumb_down", selected: "false" },
            { category: "rating", display: "Stars", icon: "star", selected: "false" },
            { category: "price", display: "Price", icon: "monetization_on", selected: "false" }
        ];
        
        _this.AppService = AppService;
        _this.fetchProducts = fetchProducts;
        _this.setLayout = setLayout;
        _this.sortList = sortList;
        _this.setLike = setLike;
        _this.getLikes = getLikes;

        /**
         * Fetches products based of filter
         * @param {params} page number
         */
        function fetchProducts(params) {
            AppService.ShowLoader();
            var promiseObj = ProductsService.fetchProducts(params);
            promiseObj.then(function success(data) {
                
                _this.Products = data.Products;
                var dataForAutoComplete = {};

                _this.Products.map(function (sub) {

                    if (sub.rating % 1 != 0) {
                        sub.hasHalfStar = true;
                    }
                    
                    sub.StarCount = parseInt(sub.rating);

                    sub.StarCount = sub.StarCount>5?5:sub.StarCount;
                    sub.isAvail = true;
                    sub.tags.map(function (t) {
                        dataForAutoComplete[t]='http://placehold.it/250x250';
                    })
                    sub.tag = sub.tags.join(", ")
                    
                });

                $('input.autocomplete').autocomplete({
                    data: dataForAutoComplete
                });

                $timeout(function () {
                    $('.tooltipped').tooltip({ delay: 50 });
                },1000)
                AppService.HideLoader();
            },
            function error() {
                Materialize.toast("Couldn't load Products!", 4000, "red")
                AppService.HideLoader();
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
         * Filters the current Products
         */
        function sortList(sortItem) {
            
            var elmnt = document.getElementById("Products-scroll");
            elmnt.scrollTop = 0;

            AppService.ShowLoader();
            $timeout(function () {
                _this.Products.sort(function (a, b) {
                    return parseInt(b[sortItem.category]) - parseInt(a[sortItem.category]);
                })
                AppService.HideLoader();
            }, 500)

        }

        /**
         * Set Like/Dislike For the clicked product
         */
        function setLike(product, vote) {

            product.likes = 0;
            product.likes = localStorage.getItem("like_" + product.name);
            if (product.likes == null) {
                product.likes = 0;
            }

            product.dislikes = 0;
            product.dislikes = localStorage.getItem("dislike_" + product.name);
            if (product.dislikes == null) {
                product.dislikes = 0;
            }

            if (vote) {
                product.likes = parseInt(product.likes) + 1;
                localStorage.setItem("like_" + product.name, product.likes);
            }
            else {
                product.dislikes = parseInt(product.dislikes) + 1;
                localStorage.setItem("dislike_" + product.name, product.dislikes);
            }


        }

        /**
         * get Like/Dislike For a product
         */
        function getLikes(product, vote) {

            if (vote) {
                product.likes = 0;
                product.likes = localStorage.getItem("like_" + product.name);
                if (product.likes == null) {
                    product.likes = 0;
                }
                return product.likes;
            }
            else {
                product.dislikes = 0;
                product.dislikes = localStorage.getItem("dislike_" + product.name);
                if (product.dislikes == null) {
                    product.dislikes = 0;
                }
                return product.dislikes;
            }

        }


        //Initial page setup with data
        fetchProducts();
    }

})();
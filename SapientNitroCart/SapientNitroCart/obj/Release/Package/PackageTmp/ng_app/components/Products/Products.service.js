(function () {
    angular.module('NitroCartApp.Products.services',[])
           .factory('ProductsService', ProductsService);

    ProductsService.$inject = ["$q", "$http", "appConstants"];

    function ProductsService($q, $http, appConstants) {


        var ProductsService = {
            fetchProducts: fetchProducts,
        };

        return ProductsService;

        function fetchProducts() {
            var def = $q.defer();
            var req = {
                method: 'GET',
                url: appConstants.SapientNitroBaseURL,
                headers: {},
                params: {
                    type: 'json',
                    query: 'list_deals'
                }
            }
            
            $http(req).then(function (response, status, headers, config) {
                def.resolve({
                    Products: response.data.deals,
                });
            }, function (arg) {
                def.reject(arg.data);
            });

            return def.promise;
        }


    }
})();
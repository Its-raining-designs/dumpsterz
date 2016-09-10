var NavigationController = angular.module("dumpsterz")
.controller('NavigationController', NavigationController);

NavigationController.$inject = ['$rootScope', '$scope', '$location', '$timeout', 'AppService', 'dumpsterzThemes'];

function NavigationController($rootScope, $scope, $location, $timeout, AppService, dumpsterzThemes) {

    $scope.dumpsterzThemes = dumpsterzThemes;

    $scope.navigateTo = function (view) {
        window.scrollTo(0, 0);
        $location.url('/' + view)
    }

    $scope.openHamburger = function () {
        document.getElementById("tray").style.display = "block";
    }

    $scope.setTheme = function (theme) {
        $scope.dumpsterzThemes.activeTheme = theme;
        window.localStorage.setItem("dumpsterz_theme", theme);
    }

    //Setting active tab Style
    switch ($location.$$path) {
        case '/works':
            $scope.worksClass = "active";
            $scope.meClass = "";
            break;

        case '/me':
            $scope.worksClass = "";
            $scope.meClass = "active";
            break;
        default:
            $scope.worksClass = "active";
            $scope.meClass = "";
            break;
    }

}
(function () {
    'use strict';
    var LoginController = angular.module("diaperDumpsterApp")
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$location', '$timeout', 'AppService', 'ParseLoginService'];

    function LoginController($scope, $location, $timeout, AppService, ParseLoginService) {

        var _this = $scope;
        _this.User = {};
        _this.openLoginPopUp = openLoginPopUp;
        _this.login = login;
        _this.logout = logout;
        _this.openSignupPopUp = openSignupPopUp;
        _this.signup = signup;
        _this.getCurrentUser = getCurrentUser;

        _this.showSignUpControls = showSignUpControls;

        function openLoginPopUp() {
            _this.login_id = "", _this.login_pwd = "";
            $('#sign-in-modal').openModal();
        }
        function openSignupPopUp() {
            _this.signup_email = "",_this.signup_id = "", _this.signup_pwd = "";
            $('#sign-up-modal').openModal();
        }


        function login() {
            if (_this.login_id == "") {
                Materialize.toast("Enter a valid login id", 3000, "red");
                return;
            }
            else if (_this.login_pwd == "") {
                Materialize.toast("Enter a Valid Password", 3000, "red");
                return;
            }


            ParseLoginService.login(_this.login_id, _this.login_pwd).then(function (_loggedInUser) {

                sessionStorage.sessionToken = _loggedInUser.sessionToken;
                sessionStorage.loggedInUser = _loggedInUser;
                _this.User = _loggedInUser;

                Materialize.toast("User Logged In " + _loggedInUser.username, 4000, "blue");
                $('#sign-in-modal').closeModal();

            }, function error(_errorResponse) {
                // if error occurred anywhere above, this code will
                // be executed
                Materialize.toast("Login Failed !<br>" + _errorResponse.error, 4000, "red");
            });
        }

        function signup() {
            if (_this.signup_email == "") {
                Materialize.toast("Enter a valid Email-ID", 3000, "red");
                return;
            }
            else if (_this.signup_id == "") {
                Materialize.toast("Enter a valid User id", 3000, "red");
                return;
            }
            else if (_this.signup_pwd == "") {
                Materialize.toast("Enter a Valid Password", 3000, "red");
                return;
            }
            ParseLoginService.signup(_this.signup_email, _this.signup_id, _this.signup_pwd).then(function (_loggedInUser) {
                Materialize.toast("Signed up successfully !", 4000, "blue");
                $('#sign-up-modal').closeModal();
                $('#sign-in-modal').openModal();

            }, function error(_errorResponse) {
                // if error occurred anywhere above, this code will
                // be executed
                Materialize.toast("Sign-up Failed !<br>" + _errorResponse, 4000, "red");
            });
        }

        function getCurrentUser() {
            ParseLoginService.getCurrentUser().then(function (user) {
                sessionStorage.sessionToken = user.sessionToken;
                sessionStorage.loggedInUser = user;
                _this.User = user;
            }, function error(_errorResponse) {
                delete sessionStorage.sessionToken;
                delete sessionStorage.loggedInUser;
                delete _this.User;
            });
        }

        function logout() {
            ParseLoginService.logout().then(function (_loggedInUser) {
                Materialize.toast("Successfully logged out!", 4000, "blue");
                delete sessionStorage.sessionToken;
                delete sessionStorage.loggedInUser;

            }, function error(_errorResponse) {
                Materialize.toast("Logout Failed !<br>" + _errorResponse, 4000, "red");
            });
        }

        function showSignUpControls() {
            if (sessionStorage.sessionToken) {
                return false;
            }
            else {
                return true
            }
        }


        getCurrentUser();
    }
})();
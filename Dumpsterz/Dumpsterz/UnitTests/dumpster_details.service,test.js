/// <reference path="E:\Github\Try-Outs\Dumpsterz\Dumpsterz\ng_app/common/Credentials.js" />
/// <reference path="E:\Github\Try-Outs\Dumpsterz\Dumpsterz\js_setup/angular.js" />
/// <reference path="E:\Github\Try-Outs\Dumpsterz\Dumpsterz\js_setup/angular-route.js" />
/// <reference path="E:\Github\Try-Outs\Dumpsterz\Dumpsterz\js_setup/angular-mocks.js" />
/// <reference path="E:\Github\Try-Outs\Dumpsterz\Dumpsterz\js_setup/jasmine/jasmine.js" />
/// <reference path="E:\Github\Try-Outs\Dumpsterz\Dumpsterz\ng_app/App.js" />
/// <reference path="E:\Github\Try-Outs\Dumpsterz\Dumpsterz\ng_app/components/dumpsters/dumpsters.module.js" />
/// <reference path="E:\Github\Try-Outs\Dumpsterz\Dumpsterz\ng_app/components/dumpster_details/dumpster_details.module.js" />
/// <reference path="E:\Github\Try-Outs\Dumpsterz\Dumpsterz\ng_app/components/dumpsters/dumpsters.service.js" />
/// <reference path="E:\Github\Try-Outs\Dumpsterz\Dumpsterz\ng_app/components/dumpsters/dumpsters.controller.js" />
/// <reference path="E:\Github\Try-Outs\Dumpsterz\Dumpsterz\ng_app/components/dumpster_details/dumpster_details.service.js" />
/// <reference path="E:\Github\Try-Outs\Dumpsterz\Dumpsterz\ng_app/components/dumpster_details/dumpster_details.controller.js" />

/// <reference path="E:\Github\Try-Outs\Dumpsterz\Dumpsterz\ng_app/common/ParseLoginService.js" />



describe('Parse Login Service', function () {

    beforeEach(module('diaperDumpsterApp'));

    var scope, promiseFactory, $window;
    // inject the rootScope and factory
    beforeEach(inject(function (_$rootScope_, _ParseLoginService_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching

        // Generate a new scope
        scope = _$rootScope_.$new();
        // Expose the factory to the tests
        promiseFactory = _ParseLoginService_;
       
    }));

    describe('login method', function () {

        it('should get the current user object if logged in', function () {
            promiseFactory
              .login("chin2km","chin2km")
              .then(function (res) {
                  expect(res).toBeDefined();
              });
            scope.$digest();
        });

        it('should get invalid session error when user not logged in', function (done) {
            promiseFactory
              .getCurrentUser()
              .then(function (res) {
                  expect(res).toBe('This is clearly false');
                  done();
              });
            scope.$digest();

        });

    });

});
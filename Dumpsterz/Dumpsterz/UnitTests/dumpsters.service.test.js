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
    beforeEach(inject(function (_$rootScope_, _dumpstersService_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching

        // Generate a new scope
        scope = _$rootScope_.$new();
        // Expose the factory to the tests
        promiseFactory = _dumpstersService_;
       
    }));

    describe('dumpster service', function () {

        it('should get all the dumpsters in the given position and radius', function () {
            promiseFactory
              .getDumpstersInRadius({lat:52,lng:6,radii:1000})
              .then(function (res) {
                  expect(res).toBeDefined();
              });
            scope.$digest();
        });

        it('should get all the dumpsters in the given position box', function (done) {
            promiseFactory
              .getDumpstersInBox({ pos1: {lat:50,lng:6}, pos2: {lat:56,lng:10}})
              .then(function (res) {
                  expect(res).toBe('This is clearly false');
                  done();
              });
            scope.$digest();

        });

    });

});
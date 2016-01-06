'use strict';

var applicationStateService;

describe('HandmadeHero.ApplicationState module', function() {
    beforeEach(module('HandmadeHero.ApplicationState'));
    beforeEach(inject(function (_applicationStateService_) {
        applicationStateService = _applicationStateService_;
    }));

    it('holds application state against keys', function() {
        var key = 'myKey';
        var myValue = 123;
        
        applicationStateService.set(key, myValue);
        
        expect(applicationStateService.get(key)).toEqual(myValue);
    });
    
//    it('holds references to any angular $intervals that we set up, so that we can cancel them during shutdown..', function() {
//        var anInterval = {an:'interval'};
//        var anotherInterval = {another:'interval'};
//
//        applicationStateService.interval(anInterval);
//        applicationStateService.interval(anotherInterval);
//
//        expect( applicationStateService.intervals() ).toEqual( [anInterval, anotherInterval] );
//    });
});


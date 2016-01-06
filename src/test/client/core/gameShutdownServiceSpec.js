'use strict';

var gameShutdownService,
    $interval,
    applicationStateService,
    $;

describe('HandmadeHero.GameShutdown module', function() {

    beforeEach(function() {
        var mockJQuery = {
            unbind: jasmine.createSpy()
        };
        $ = function() {return mockJQuery;}
    });
    
    beforeEach(module('HandmadeHero.GameShutdown'));

    var mockInterval = {cancel:jasmine.createSpy()};

    beforeEach(module(function($provide) {
        $provide.service('$interval', function () {
            return mockInterval;
        });
    }));
    
    beforeEach(inject(function (_gameShutdownService_, _$interval_, _applicationStateService_) {
        gameShutdownService = _gameShutdownService_;
        $interval = _$interval_;
        applicationStateService = _applicationStateService_;
    }));

    it('cancels all the intervals held in the applicationStateService', function() {
        var interval1 = {interval:1};
        var interval2 = {interval:2};
        
        applicationStateService.interval(interval1);
        applicationStateService.interval(interval2);

        gameShutdownService();
        
        expect( $interval.cancel ).toHaveBeenCalledWith( interval1 );
        expect( $interval.cancel ).toHaveBeenCalledWith( interval2 );
    });

    it('unbinds the keydown event', function() {
        gameShutdownService();
        expect( $().unbind ).toHaveBeenCalledWith('keydown');
    });
    
    it('unbinds the keyup event', function() {
        gameShutdownService();
        expect( $().unbind ).toHaveBeenCalledWith('keyup');
    });
    
    it('unbinds the mousemove event', function() {
        gameShutdownService();
        expect( $().unbind ).toHaveBeenCalledWith('mousemove');
    });
    
    it('unbinds the mouseup event', function() {
        gameShutdownService();
        expect( $().unbind ).toHaveBeenCalledWith('mouseup');
    });
    
    it('unbinds the mousedown event', function() {
        gameShutdownService();
        expect( $().unbind ).toHaveBeenCalledWith('mousedown');
    });
});


'use strict';

var gameStartupService,
    applicationStateService,
    gameWorldService;

describe('HandmadeHero.GameStartup module', function() {

    beforeEach(module('HandmadeHero.GameStartup'));

    var mockGameWorldService= {
        initialise: jasmine.createSpy()
    };
    beforeEach(module(function($provide) {
        $provide.service('gameWorldService', function () {
            return mockGameWorldService;
        });
    }));

    beforeEach(inject(function (_gameStartupService_, _applicationStateService_, _gameWorldService_) {
        gameStartupService = _gameStartupService_;
        applicationStateService = _applicationStateService_;
        gameWorldService = _gameWorldService_;
    }));

//    it('binds window.resize to $renderService.resize', function() {
//        gameStartupService();
//        expect( $().resize ).toHaveBeenCalledWith( renderingService.resize );
//    });
//
//    it('binds document.keydown to $keyboardHandler.keydown', function() {
//        gameStartupService();
//        expect( $().bind ).toHaveBeenCalledWith( 'keydown', keyboardHandler.keydown );
//    });
//
//    it('binds document.keyup to $keyboardHandler.keyup', function() {
//        gameStartupService();
//        expect( $().bind ).toHaveBeenCalledWith( 'keyup', keyboardHandler.keyup );
//    });
//
//    it('binds document.mousemove to $keyboardHandler.mousemove', function() {
//        gameStartupService();
//        expect( $().bind ).toHaveBeenCalledWith( 'mousemove', keyboardHandler.mousemove );
//    });
//
//    it('binds document.mouseup to $keyboardHandler.mouseup', function() {
//        gameStartupService();
//        expect( $().bind ).toHaveBeenCalledWith( 'mouseup', keyboardHandler.mouseup );
//    });
//
//    it('binds document.mousedown to $keyboardHandler.mousedown', function() {
//        gameStartupService();
//        expect( $().bind ).toHaveBeenCalledWith( 'mousedown', keyboardHandler.mousedown );
//    });
//
//    it('switches off the mouse cursor', function() {
//        gameStartupService();
//        expect( $().css ).toHaveBeenCalledWith( 'cursor', 'none' );
//    });
//
    it('initialises the gameworld', function() {
        gameStartupService();
        expect( gameWorldService.initialise ).toHaveBeenCalled();
    });

    it('sets continueToRun into applicationState', function() {
        gameStartupService();
        expect( applicationStateService.get('continueToRun') ).toEqual(true);
    });
});


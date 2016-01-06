'use strict';

var gameStartupService,
    applicationStateService,
    gameWorldService,
    renderingService,
    inputService,
    $;

describe('HandmadeHero.GameStartup module', function() {

    beforeEach(function() {
        var mockJQuery = {
            bind: jasmine.createSpy(),
            resize: jasmine.createSpy(),
            css: jasmine.createSpy()
        };
        $ = function() {return mockJQuery;}
    });

    beforeEach(module('HandmadeHero.GameStartup'));

    var mockRenderingService = {
        resize: jasmine.createSpy(),
        initialise: jasmine.createSpy()
    };
    beforeEach(module(function($provide) {
        $provide.service('renderingService', function () {
            return mockRenderingService;
        });
    }));

    var mockGameWorldService= {
        initialise: jasmine.createSpy()
    };
    beforeEach(module(function($provide) {
        $provide.service('gameWorldService', function () {
            return mockGameWorldService;
        });
    }));

    beforeEach(inject(function (_gameStartupService_, _applicationStateService_, _gameWorldService_, _renderingService_, _inputService_) {
        gameStartupService = _gameStartupService_;
        applicationStateService = _applicationStateService_;
        gameWorldService = _gameWorldService_;
        renderingService = _renderingService_;
        inputService = _inputService_;
    }));

    it('binds window.resize to $renderService.resize', function() {
        gameStartupService();
        expect( $().resize ).toHaveBeenCalledWith( renderingService.resize );
    });

    it('binds document.keydown to $inputService.keydown', function() {
        gameStartupService();
        expect( $().bind ).toHaveBeenCalledWith( 'keydown', inputService.keydown );
    });

    it('binds document.keyup to $inputService.keyup', function() {
        gameStartupService();
        expect( $().bind ).toHaveBeenCalledWith( 'keyup', inputService.keyup );
    });

    it('binds document.mousemove to $inputService.mousemove', function() {
        gameStartupService();
        expect( $().bind ).toHaveBeenCalledWith( 'mousemove', inputService.mousemove );
    });

    it('binds document.mouseup to $inputService.mouseup', function() {
        gameStartupService();
        expect( $().bind ).toHaveBeenCalledWith( 'mouseup', inputService.mouseup );
    });

    it('binds document.mousedown to $inputService.mousedown', function() {
        gameStartupService();
        expect( $().bind ).toHaveBeenCalledWith( 'mousedown', inputService.mousedown );
    });

    it('switches off the mouse cursor', function() {
        gameStartupService();
        expect( $().css ).toHaveBeenCalledWith( 'cursor', 'none' );
    });

    it('initialises the gameworld', function() {
        gameStartupService();
        expect( gameWorldService.initialise ).toHaveBeenCalled();
    });

    it('sets continueToRun into applicationState', function() {
        gameStartupService();
        expect( applicationStateService.get('continueToRun') ).toEqual(true);
    });
    
    it('initialises the renderingService', function() {
        //TODO prove that we're passing the right elements..
        gameStartupService();
        expect( renderingService.initialise).toHaveBeenCalled();
    });

    it('calls resize on the renderingService (to force the app to fullscreen)', function() {
        gameStartupService();
        expect( renderingService.resize ).toHaveBeenCalled();
    });
});


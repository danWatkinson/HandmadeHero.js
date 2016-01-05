'use strict';

var gameLoopService,
    applicationStateService,
    performanceService,
    renderingService,
    gameShutdownService;

describe('HandmadeHero.GameLoop module', function() {

    beforeEach(module('HandmadeHero.GameLoop'));

    var mockPerformanceService = {
        tick: jasmine.createSpy()
    };
    var mockRenderingService = {
        prepareRendering: jasmine.createSpy().and.callFake(function(callback) {
            callback();
        }),
        display: jasmine.createSpy()
    };
    var mockGameShutdownService = jasmine.createSpy();

    beforeEach(module(function($provide) {
        $provide.service('performanceService', function() {
            return mockPerformanceService;
        });
        $provide.service('renderingService', function() {
            return mockRenderingService;
        });
        $provide.service('gameShutdownService', function() {
            return mockGameShutdownService;
        });
    }));

    beforeEach(inject(function (_gameLoopService_, _applicationStateService_, _performanceService_, _renderingService_, _gameShutdownService_) {
        gameLoopService = _gameLoopService_;
        applicationStateService = _applicationStateService_;
        performanceService = _performanceService_;
        renderingService = _renderingService_;
        gameShutdownService = _gameShutdownService_;
    }));

    it('calls gameShutdownService() when applicationStateService.continueToRun = false', function() {
        applicationStateService.set('continueToRun', false);
        gameLoopService();
        expect( gameShutdownService ).toHaveBeenCalled();
    });

    it('calls performanceService.tick() when applicationStateService.continueToRun = true', function() {
        applicationStateService.set('continueToRun', true);
        gameLoopService();
        expect( performanceService.tick).toHaveBeenCalled();
        applicationStateService.set('continueToRun', false);
    });

    it('calls renderingService.render() when applicationStateService.continueToRun = true', function() {
        applicationStateService.set('continueToRun', true);
        gameLoopService();
        expect( renderingService.prepareRendering).toHaveBeenCalled();
        applicationStateService.set('continueToRun', false);
    });

});


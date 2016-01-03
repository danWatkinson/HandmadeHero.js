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
        render: jasmine.createSpy().and.callFake(function(callback) {
            callback();
        })

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

    it('calls performanceService.tick()', function() {
        gameLoopService();
        expect( performanceService.tick).toHaveBeenCalled();
    });

    it('calls renderingService.render()', function() {
        gameLoopService();
        expect( renderingService.render).toHaveBeenCalled();
    });
    
    it('calls gameShutdownService() when applicationStateService.continueToRun = false', function() {
        applicationStateService.set('continueToRun', false);
        gameLoopService();
        expect( gameShutdownService ).toHaveBeenCalled();
    });

});


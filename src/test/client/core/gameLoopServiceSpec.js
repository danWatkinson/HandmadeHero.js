'use strict';

var gameLoopService,
    applicationStateService,
    performanceMonitoringService,
    renderingService,
    gameShutdownService,
    $;

describe('HandmadeHero.GameLoop module', function() {

    beforeEach(module('HandmadeHero.GameLoop'));

    var mockPerformanceMonitoringService = {
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
        $provide.service('performanceMonitoringService', function() {
            return mockPerformanceMonitoringService;
        });
        $provide.service('renderingService', function() {
            return mockRenderingService;
        });
        $provide.service('gameShutdownService', function() {
            return mockGameShutdownService;
        });
        var mockJQuery = {
            bind: jasmine.createSpy(),
            resize: jasmine.createSpy(),
            css: jasmine.createSpy()
        };
        $ = function() {return mockJQuery;}
    }));

    beforeEach(inject(function (_gameLoopService_, _applicationStateService_, _performanceMonitoringService_, _renderingService_, _gameShutdownService_) {
        gameLoopService = _gameLoopService_;
        applicationStateService = _applicationStateService_;
        performanceMonitoringService = _performanceMonitoringService_;
        renderingService = _renderingService_;
        gameShutdownService = _gameShutdownService_;
    }));

    it('calls gameShutdownService() when applicationStateService.continueToRun = false', function() {
        applicationStateService.set('continueToRun', false);
        gameLoopService();
        expect( gameShutdownService ).toHaveBeenCalled();
    });

    it('calls performanceMonitoringService.tick() when applicationStateService.continueToRun = true', function() {
        applicationStateService.set('continueToRun', true);
        gameLoopService();
        expect( performanceMonitoringService.tick).toHaveBeenCalled();
        applicationStateService.set('continueToRun', false);
    });

    it('calls renderingService.render() when applicationStateService.continueToRun = true', function() {
        applicationStateService.set('continueToRun', true);
        gameLoopService();
        expect( renderingService.prepareRendering).toHaveBeenCalled();
        applicationStateService.set('continueToRun', false);
    });

});


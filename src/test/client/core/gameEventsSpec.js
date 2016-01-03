'use strict';

var gameEventService,
    applicationStateService,
    cameraService;

describe('HandmadeHero.GameEvents module', function() {

    beforeEach(module('HandmadeHero.GameEvents'));
    
    beforeEach(inject(function (_gameEventService_, _applicationStateService_, _cameraService_) {
        gameEventService = _gameEventService_;
        applicationStateService = _applicationStateService_;
        cameraService = _cameraService_;
    }));

    it('event:shutdown -> sets applicationStateService.continueToRun = false', function() {
        applicationStateService.set('continueToRun', true);
        gameEventService.event({event:'shutdown'});
        expect( applicationStateService.get('continueToRun')).toEqual(false);
    });

    it('event:cameraPan delta.x -> increments the cameras x value by the provided delta', function() {
        cameraService.x = 100;
        gameEventService.event({event:'cameraPan', delta:{x:+1}});
        expect( cameraService.x ).toEqual(101);
    });

    it('event:cameraPan delta.y -> increments the cameras y value by the provided delta', function() {
        cameraService.y = 23;
        gameEventService.event({event:'cameraPan', delta:{y:-1}});
        expect( cameraService.y ).toEqual(22);
    });
    
    it('event:mouse sets the provided mouse data against applicationState.mouse', function() {
        applicationStateService.set('mouse', {});
        gameEventService.event({event:'mouse', pointer: {my:'mouseData'}});
        expect( applicationStateService.get('mouse') ).toEqual({my:'mouseData'});
    });

});


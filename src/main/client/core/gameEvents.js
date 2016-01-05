'use strict';

angular.module('HandmadeHero.GameEvents', ['HandmadeHero.ApplicationState','HandmadeHero.Camera'])
    .factory('gameEventService', ['applicationStateService', 'cameraService', function($applicationStateService, $cameraService) {
        
        function event(gameEvent) {
            if (gameEvent.event == 'shutdown') {
                $applicationStateService.set('continueToRun', false);
            } else if (gameEvent.event == 'cameraPan') {
                if (gameEvent.delta.x) {
                    $cameraService.x += gameEvent.delta.x;
                }
                if (gameEvent.delta.y) {
                    $cameraService.y += gameEvent.delta.y;
                }
            } else if (gameEvent.event == 'mouse') {
                $applicationStateService.set('mouse', gameEvent.mouseState);
            } else {
                console.log('unrecognisedGameEvent : ' + gameEvent);
            }
        }
        
        return {
            event: event,
            
            shutdown: {event:'shutdown'},
            up: {event:'cameraPan', delta: {y:-1}},
            upFast: {event:'cameraPan', delta: {y:-2}},
            down: {event:'cameraPan', delta: {y:+1}},
            downFast: {event:'cameraPan', delta: {y:+2}},
            left: {event:'cameraPan', delta: {x:-1}},
            leftFast: {event:'cameraPan', delta: {x:-2}},
            right: {event:'cameraPan', delta: {x:+1}},
            rightFast: {event:'cameraPan', delta: {x:+2}}
        }
    }]);

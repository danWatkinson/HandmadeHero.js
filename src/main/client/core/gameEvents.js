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
            event: event
        }
    }]);

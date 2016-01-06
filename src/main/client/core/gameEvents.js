'use strict';

angular.module('HandmadeHero.GameEvents', ['HandmadeHero.ApplicationState','HandmadeHero.Camera'])
    .factory('gameEventService', ['applicationStateService', 'cameraService', function($applicationStateService, $cameraService) {
        
        var eventLog = [];
        
        function event(gameEvent) {
            eventLog.push(gameEvent);
        }
        
        function processEvents() {
            var numberOfEvents = eventLog.length;
            
            for (var i=0; i<numberOfEvents; i++) {
                _processEvent(eventLog.shift());
            }
        }
        
        function _processEvent(gameEvent) {
            //console.log('processing event: ' + JSON.stringify(gameEvent));
            //TODO leakage
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
            processEvents: processEvents
        }
    }]);

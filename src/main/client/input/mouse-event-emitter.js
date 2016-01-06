'use strict';

// fires the current mouse-status as an event

angular.module('HandmadeHero.Input.MouseEventEmitter', ['HandmadeHero.Input.MouseHandler', 'HandmadeHero.GameEvents'])
    .factory('mouseEventEmitter', ['mouseHandler', 'gameEventService', function($mouseHandler, $gameEventService) {
        
        function generateInputEvents() {
            $gameEventService.event({event: 'mouse', mouseState: $mouseHandler.readState()});
        }

        return {
            generateInputEvents: generateInputEvents
        }
    }]);



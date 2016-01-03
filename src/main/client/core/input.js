'use strict';

angular.module('HandmadeHero.Input', ['HandmadeHero.GameEvents', 'HandmadeHero.ApplicationState'])
    .factory('inputService', ['$interval', 'gameEventService', 'applicationStateService', function($interval, $gameEvents, $applicationStateService) {
        
        var keyState = [];
        var mouseState = {};
        var delta;
        $applicationStateService.interval($interval(sendInput, 1));

        function sendInput() {
            if (keyState[67] && keyState[17]) { //'c' + 'ctrl'
                $gameEvents.event({event: 'shutdown'});
            } if (keyState[87]){
                delta = 1;
                if (keyState[16]) {
                    delta = 2
                }
                $gameEvents.event({event: 'cameraPan', delta: {y: -delta} });
            } if (keyState[83]){
                delta = 1;
                if (keyState[16]) {
                    delta = 2
                }
                $gameEvents.event({event: 'cameraPan', delta: {y: +delta} });
            } if (keyState[65]){
                delta = 1;
                if (keyState[16]) {
                    delta = 2
                }
                $gameEvents.event({event: 'cameraPan', delta: {x: -delta} });
            } if (keyState[68]){
                delta = 1;
                if (keyState[16]) {
                    delta = 2
                }
                $gameEvents.event({event: 'cameraPan', delta: {x: +delta} });
            }
            
            $gameEvents.event({event: 'mouse', mouseState: mouseState});
        }

        return {
            keydown: function(e) {
                console.log('keydown:' + e.keyCode);
                keyState[e.keyCode] = true;
            },
            keyup: function(e) {
                keyState[e.keyCode] = false;
            },
            mousemove: function(e) {
                mouseState.x = e.pageX;
                mouseState.y = e.pageY;
            },
            mouseleave: function(e) {
                mouseState = {};
            },
            mousedown: function(e) {
                mouseState.click = true;
                mouseState.clickLocation = {x: mouseState.x, y: mouseState.y};
            },
            mouseup: function(e) {
                mouseState.click = false;
                mouseState.releaseLocation = {x: mouseState.x, y: mouseState.y};
            }
        }
    }]);

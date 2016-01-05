'use strict';

angular.module('HandmadeHero.Input', ['HandmadeHero.InputProcessor'])
    .factory('inputService', ['inputProcessorService', function($inputProcessorService) {
        
        var keyState = [];
        var mouseState = {};

        function processInput() {
            $inputProcessorService.process({
                timestamp: window.performance.now(),
                keyState: keyState,
                mouseState: mouseState
            })
        }
        
        return {
            keydown: function(e) {
                keyState[e.keyCode] = true;
                processInput();
            },
            keyup: function(e) {
                keyState[e.keyCode] = false;
                processInput();
            },
            mousemove: function(e) {
                mouseState.x = e.pageX;
                mouseState.y = e.pageY;
                processInput();
            },
            mouseleave: function(e) {
                mouseState = {};
                processInput();
            },
            mousedown: function(e) {
                mouseState.click = true;
                mouseState.clickLocation = {x: mouseState.x, y: mouseState.y};
                processInput();
            },
            mouseup: function(e) {
                mouseState.click = false;
                mouseState.releaseLocation = {x: mouseState.x, y: mouseState.y};
                processInput();
            }
        }
    }]);

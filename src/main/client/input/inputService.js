'use strict';

// handles keyboard events, maintaining a 'current state'
// handles mouse events, maintaining a 'current state'
//TODO blurrage - one service responsible for keyboard events and mouse events?

angular.module('HandmadeHero.Input', [])
    .factory('inputService', [function() {
        
        var keyState = [];
        var mouseState = {};

        return {
            keydown: function(e) {
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
            },
            readState: function() {
                return {
                    keyState: keyState,
                    mouseState: mouseState
                };
            }
        }
    }]);

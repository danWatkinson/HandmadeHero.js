'use strict';

// handles keyboard events, maintaining a 'current state'
// handles mouse events, maintaining a 'current state'
//TODO blurrage - one service responsible for keyboard events and mouse events?

angular.module('HandmadeHero.Input.KeyboardHandler', [])
    .factory('keyboardHandler', [function() {
        
        var keyState = [];

        return {
            keydown: function(e) {
                keyState[e.keyCode] = true;
            },
            keyup: function(e) {
                keyState[e.keyCode] = false;
            },
            readState: function() {
                return {
                    keyState: keyState
                };
            }
        }
    }]);

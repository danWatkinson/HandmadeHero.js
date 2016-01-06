'use strict';

// handles keyboard events, maintaining a 'current state'
// handles mouse events, maintaining a 'current state'
//TODO blurrage - one service responsible for keyboard events and mouse events?

angular.module('HandmadeHero.Input.KeyboardHandler', [])
    .factory('keyboardHandler', [function() {

        var keyState = [];
        
        function _keydown(e) {
            keyState[e.keyCode] = true;
        }
        
        function _keyup(e) {
            keyState[e.keyCode] = false;
        }
        
        $(document).bind('keydown', _keydown);
        $(document).bind('keyup', _keyup);

        return {
            readState: function() {
                return {
                    keyState: keyState
                };
            }
        }
    }]);

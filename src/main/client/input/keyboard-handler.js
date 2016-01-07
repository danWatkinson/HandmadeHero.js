'use strict';

angular.module('HandmadeHero.Input.KeyboardHandler', [])
    .factory('keyboardHandler', [function() {

        $(document).bind('keydown', _keydown);
        $(document).bind('keyup', _keyup);

        var state = [];

        function _keydown(e) {
            state[e.keyCode] = true;
        }

        function _keyup(e) {
            state[e.keyCode] = false;
        }

        return {
            readState: function() {
                return state;
            }
        }
    }]);

'use strict';

// handles keyboard events, maintaining a 'current state'
// handles mouse events, maintaining a 'current state'
//TODO blurrage - one service responsible for keyboard events and mouse events?

angular.module('HandmadeHero.Input.MouseHandler', [])
    .factory('mouseHandler', [function() {
        
        var state = {};
        function _mousemove(e) {
            state.x = e.pageX;
            state.y = e.pageY;
        }
        
        function _mouseleave() {
            state = {};
        }
        
        function _mousedown(e) {
            state.click = true;
            state.clickLocation = {x: state.x, y: state.y};
        }
        
        function _mouseup(e) {
            state.click = false;
            state.releaseLocation = {x: state.x, y: state.y};
        }
        
        $(document).bind('mousemove', _mousemove);
        $(document).bind('mouseleave', _mouseleave);
        $(document).bind('mouseup', _mouseup);
        $(document).bind('mousedown', _mousedown);

        $('body').css('cursor', 'none');

        return {
            readState: function() {
                return state;
            }
        }

    }]);

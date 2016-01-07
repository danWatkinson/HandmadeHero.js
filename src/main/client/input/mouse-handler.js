'use strict';

angular.module('HandmadeHero.Input.MouseHandler', [])
    .factory('mouseHandler', [function() {
        
        $(document).bind('mousemove', _mousemove);
        $(document).bind('mouseleave', _mouseleave);
        $(document).bind('mouseup', _mouseup);
        $(document).bind('mousedown', _mousedown);
        $('body').css('cursor', 'none');

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
        
        return {
            readState: function() {
                return state;
            }
        }

    }]);

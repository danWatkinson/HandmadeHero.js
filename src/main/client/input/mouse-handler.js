'use strict';

// handles keyboard events, maintaining a 'current state'
// handles mouse events, maintaining a 'current state'
//TODO blurrage - one service responsible for keyboard events and mouse events?

angular.module('HandmadeHero.Input.MouseHandler', [])
    .factory('mouseHandler', [function() {
        
        var state = {};

        return {
            mousemove: function(e) {
                state.x = e.pageX;
                state.y = e.pageY;
            },
            mouseleave: function(e) {
                state = {};
            },
            mousedown: function(e) {
                state.click = true;
                state.clickLocation = {x: state.x, y: state.y};
            },
            mouseup: function(e) {
                state.click = false;
                state.releaseLocation = {x: state.x, y: state.y};
            },
            readState: function() {
                return state;
            }
        }
    }]);

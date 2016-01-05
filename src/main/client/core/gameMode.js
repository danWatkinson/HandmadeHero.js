'use strict';

angular.module('HandmadeHero.GameMode', ['HandmadeHero.InputProcessor'])
    .factory('gameModeService', ['inputProcessorService', function($inputProcessorService) {

        var key = {
            ctrl: 17,
            shift: 16,
            c: 67,
            w: 87,
            s: 83,
            a: 65,
            d: 68
        };

        var events = {
            shutdown: {event: 'shutdown'},
            up: {event: 'cameraPan', delta: {y: -1}},
            upFast: {event: 'cameraPan', delta: {y: -2}},
            down: {event: 'cameraPan', delta: {y: +1}},
            downFast: {event: 'cameraPan', delta: {y: +2}},
            left: {event: 'cameraPan', delta: {x: -1}},
            leftFast: {event: 'cameraPan', delta: {x: -2}},
            right: {event: 'cameraPan', delta: {x: +1}},
            rightFast: {event: 'cameraPan', delta: {x: +2}}
        };
        
        var modes = {
            test: {
                inputRules: [
                    { pressed: [key.ctrl, key.c], event: events.shutdown },
                    { pressed: [key.shift, key.w], event: events.upFast },
                    { pressed: [key.w], notPressed: [key.shift], event: events.up},
                    { pressed: [key.shift, key.s], event: events.downFast },
                    { pressed: [key.s], notPressed: [key.shift], event: events.down },
                    { pressed: [key.shift, key.a], event: events.leftFast },
                    { pressed: [key.a], notPressed: [key.shift], event: events.left },
                    { pressed: [key.shift, key.d], event: events.rightFast },
                    { pressed: [key.d], notPressed: [key.shift], event: events.right }
                ]
            }
        };
        
        function mode(newMode) {
            if (modes[newMode]) {
                $inputProcessorService.setRules(modes[newMode].inputRules);
            } else {
                console.log('unknown game mode');
            }
        }
        
        return {
            mode: mode
        }
    }]);

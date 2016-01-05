'use strict';

angular.module('HandmadeHero.InputProcessor', ['HandmadeHero.GameEvents'])
    .factory('inputProcessorService', ['gameEventService', function($gameEventService) {
        
        var key = {
            ctrl: 17,
            shift: 16,
            c: 67,
            w: 87,
            s: 83,
            a: 65,
            d: 68
        };

        var inputRules = [
            {
                pressed: [key.ctrl, key.c],
                event: $gameEventService.shutdown
            },
            {
                pressed: [key.shift, key.w],
                event: $gameEventService.upFast
            },
            {
                pressed: [key.w],
                notPressed: [key.shift],
                event: $gameEventService.up
            },
            {
                pressed: [key.shift, key.s],
                event: $gameEventService.downFast
            },
            {
                pressed: [key.s],
                notPressed: [key.shift],
                event: $gameEventService.down
            },
            {
                pressed: [key.shift, key.a],
                event: $gameEventService.leftFast
            },
            {
                pressed: [key.a],
                notPressed: [key.shift],
                event: $gameEventService.left
            },
            {
                pressed: [key.shift, key.d],
                event: $gameEventService.rightFast
            },
            {
                pressed: [key.d],
                notPressed: [key.shift],
                event: $gameEventService.right
            }

        ];

        function _ruleIsMet(rule, input) {
            return ( 
                _allPressed(rule.pressed, input) 
                && _nonePressed(rule.notPressed, input) 
            );
        }
        
        function _allPressed(keyCodes, input) {
            var allPressed = true;
            if (keyCodes) {
                for (var i=0; i<keyCodes.length; i++) {
                    if (!input.keyState[keyCodes[i]]) {
                        allPressed = false;
                        break;
                    }
                }
            }
            return allPressed;
        }
        
        function _nonePressed(keyCodes, input) {
            var nonePressed = true;
            if (keyCodes) {
                for (var i=0; i<keyCodes.length; i++) {
                    if (input[keyCodes[i]]) {
                        nonePressed = false;
                        break;
                    }
                }
            }
            return nonePressed;
        }
        
        function setRules(newRules) {
            inputRules = newRules;
        }
        
        function process(input) {
            for (var i=0; i<inputRules.length; i++) {
                if (_ruleIsMet(inputRules[i], input)) {
                    $gameEventService.event(inputRules[i].event);
                }
            }
            $gameEventService.event({event: 'mouse', mouseState: input.mouseState});
        }

        return {
            process: process,
            setRules: setRules
        }
    }]);



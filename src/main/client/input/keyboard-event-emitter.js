'use strict';

// asks the inputService for the current state
// checks its current rules for key-combinations that should trigger an event
// fires the current mouse-status as an event
//TODO looks like logic has got misplaced around the mouse events.. check rendering code for leakages

angular.module('HandmadeHero.Input.KeyboardEventEmitter', ['HandmadeHero.Input.KeyboardHandler', 'HandmadeHero.GameEvents'])
    .factory('keyboardEventEmitter', ['keyboardHandler', 'gameEventService', function($keyboardHandler, $gameEventService) {
        
        var inputRules = [];
        
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
        
        function generateInputEvents() {
            _process($keyboardHandler.readState());
        }
        
        function _process(input) {
            for (var i=0; i<inputRules.length; i++) {
                if (_ruleIsMet(inputRules[i], input)) {
                    $gameEventService.event(inputRules[i].event);
                }
            }
        }

        return {
            generateInputEvents: generateInputEvents,
            setRules: setRules
        }
    }]);



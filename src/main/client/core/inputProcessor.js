'use strict';

angular.module('HandmadeHero.InputProcessor', ['HandmadeHero.Input', 'HandmadeHero.GameEvents'])
    .factory('inputProcessorService', ['inputService', 'gameEventService', function($inputService, $gameEventService) {
        
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
            _process($inputService.readState());
        }
        
        function _process(input) {
            for (var i=0; i<inputRules.length; i++) {
                if (_ruleIsMet(inputRules[i], input)) {
                    $gameEventService.event(inputRules[i].event);
                }
            }
            $gameEventService.event({event: 'mouse', mouseState: input.mouseState});
        }

        return {
            generateInputEvents: generateInputEvents,
            setRules: setRules
        }
    }]);



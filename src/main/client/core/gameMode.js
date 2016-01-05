'use strict';

angular.module('HandmadeHero.GameMode', ['HandmadeHero.InputProcessor', 'HandmadeHero.GameEvents'])
    .factory('gameModeService', ['inputProcessorService', 'gameEventService', function($inputProcessorService, $gameEventService) {

        var key = {
            ctrl: 17,
            shift: 16,
            c: 67,
            w: 87,
            s: 83,
            a: 65,
            d: 68
        };

        function mode(newMode) {
            if (newMode == 'test') {
                
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

                $inputProcessorService.setRules(inputRules);

            } else {
                console.log('unknown game mode');
            }
            
        }
        
        return {
            mode: mode
        }
    }]);

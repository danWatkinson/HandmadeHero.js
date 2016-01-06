'use strict';

angular.module('HandmadeHero.GameMode', ['HandmadeHero.GameWorld', 'HandmadeHero.Camera', 'HandmadeHero.InputProcessor', 'HandmadeHero.Screen.RenderingService', 'HandmadeHero.ApplicationState', 'HandmadeHero.GameEvents'])
    .factory('gameModeService', ['gameWorldService', 'cameraService', 'inputProcessorService', 'renderingService', 'applicationStateService', 'gameEventService', function($gameWorldService, $cameraService, $inputProcessorService, $renderingService, $applicationStateService, $gameEventService) {

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
                ],
                eventProcessor:{
                    processEvent: function(gameEvent) {
                        if (gameEvent.event == 'shutdown') {
                            $applicationStateService.set('continueToRun', false);
                        } else if (gameEvent.event == 'cameraPan') {
                            if (gameEvent.delta.x) {
                                $cameraService.x += gameEvent.delta.x;
                            }
                            if (gameEvent.delta.y) {
                                $cameraService.y += gameEvent.delta.y;
                            }
                        } else if (gameEvent.event == 'mouse') {
                            $applicationStateService.set('mouse', gameEvent.mouseState);
                        } else {
                            console.log('unrecognisedGameEvent : ' + gameEvent);
                        }
                    }
                },
                renderer: {
                    prepareRendering: function(bufferContext, width, height) {
                        //TODO leakage - specific information about world living in generic renderer
                        var grd = bufferContext.createLinearGradient(0, 0, width, 0);
                        grd.addColorStop(0, "red");
                        grd.addColorStop(1, "white");

                        bufferContext.fillStyle = grd;

                        for (var i = 0; i<$gameWorldService.items().length; i++) {
                            var item = $gameWorldService.items()[i];
                            if (item.background) {
                                for (var y=0; y< 100; y++) {
                                    for (var x=0; x< 100; x++ ){
                                        bufferContext.drawImage($gameWorldService.assets()['/assets/images/baize.jpg'], (x*181)- $cameraService.x, (y*190)- $cameraService.y);
                                    }
                                }
                            } else {
                                bufferContext.fillRect(item.x - $cameraService.x, item.y - $cameraService.y, 100, 100);
                            }
                        }

                        //TODO leakage - hard-coded mouse behaviour
                        var mouse = $applicationStateService.get('mouse');
                        if (mouse && mouse.x) {
                            var radius = mouse.click ? 5 : 10;
                            bufferContext.lineWidth = 10;
                            bufferContext.strokeStyle = 'blue';
                            bufferContext.beginPath();
                            bufferContext.arc(mouse.x, mouse.y, radius,0,2*Math.PI);
                            bufferContext.stroke();

                            if (mouse.click) {
                                bufferContext.moveTo(mouse.clickLocation.x, mouse.clickLocation.y);
                                bufferContext.lineTo(mouse.x,mouse.y);
                                bufferContext.stroke();
                            }
                        }
                    }
                }
            }

        };
        
        return {
            mode: function mode(newMode) {
                if (modes[newMode]) {
                    $inputProcessorService.setRules(modes[newMode].inputRules);
                    $renderingService.setRenderer(modes[newMode].renderer);
                    $gameEventService.setEventProcessor(modes[newMode].eventProcessor);
                } else {
                    console.log('unknown game mode');
                }
            }
        }
    }]);

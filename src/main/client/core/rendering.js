'use strict';

angular.module('HandmadeHero.Rendering', ['HandmadeHero.ApplicationState', 'HandmadeHero.GameWorld', 'HandmadeHero.Camera'])
    .factory('renderingService', ['applicationStateService', 'gameWorldService', 'cameraService', function($applicationStateService, $gameWorldService, $cameraService) {

        var screenCanvas;
        var screenContext;
        var bufferCanvas;
        var bufferContext;

        var height;
        var width;

        var base_image;
        
        var predictedFipTime_milliseconds = 5.1;
        var predictedLossToSetTimeout_milliseconds = 1;
        var targetElapsedTime_millieconds;

        function initialise(screen, buffer, desiredFrameRate_hz) {
            screenCanvas = screen;
            height = $(screen).attr('height');
            width = $(screen).attr('width');
            
            screenContext = screenCanvas.getContext("2d");
            bufferCanvas = buffer;
            bufferContext = bufferCanvas.getContext("2d");
            
            targetElapsedTime_millieconds = (1000 / desiredFrameRate_hz);

            base_image = new Image();
            base_image.src = '/assets/images/baize.jpg';
            base_image.onload = function() {
                //TODO tie this up properly so we only move on when we have the image?
                //  - wrap into an asset service perhaps?
                //console.log('!');
            }

        }

        function resize() {
            width = $(window).innerWidth();
            height = $(window).innerHeight();
            
            $(screenCanvas).attr('width', width);
            $(screenCanvas).attr('height', height);
            $(bufferCanvas).attr('width', width);
            $(bufferCanvas).attr('height', height);
        }

        function render(callback) {
            
            var renderStart = window.performance.now();
            _renderWorldToBuffer(bufferContext);
            setTimeout(_flip,  _calculateSleep(renderStart) );

            function _flip() {
                _tuneSleepAsBestWeCan(renderStart);
                screenContext.drawImage(
                    bufferCanvas,         //source
                    0, 0, width, height,  //copy from source
                    0, 0, width, height); //paste to target
                callback();
            }
            
            function _calculateSleep(startTime_milliseconds) {
                var elapsedForRendering_milliseconds = (window.performance.now() - startTime_milliseconds);
                var sleepTime_milliSeconds = ((targetElapsedTime_millieconds - elapsedForRendering_milliseconds) );
                var sleep = Math.floor(sleepTime_milliSeconds) - predictedFipTime_milliseconds - predictedLossToSetTimeout_milliseconds;
                return sleep;
            }
            
            function _tuneSleepAsBestWeCan(startTime_milliseconds) {
                var elapsedForRendering_milliseconds = (window.performance.now() - startTime_milliseconds);
                while (elapsedForRendering_milliseconds < (targetElapsedTime_millieconds - predictedFipTime_milliseconds) ) {
                    elapsedForRendering_milliseconds = (window.performance.now() - renderStart);
                }
            }

            function _renderWorldToBuffer(buffer) {
                var grd = buffer.createLinearGradient(0, 0, width, 0);
                grd.addColorStop(0, "red");
                grd.addColorStop(1, "white");

                buffer.fillStyle = grd;

                for (var i = 0; i<$gameWorldService.items().length; i++) {
                    var item = $gameWorldService.items()[i];
                    if (item.background) {
                        for (var y=0; y< 100; y++) {
                            for (var x=0; x< 100; x++ ){
                                buffer.drawImage(base_image, (x*181)- $cameraService.x, (y*190)- $cameraService.y);
                            }
                        }
                    } else {
                        buffer.fillRect(item.x - $cameraService.x, item.y - $cameraService.y, 100, 100);
                    }
                }
                
                var mouse = $applicationStateService.get('mouse');
                if (mouse && mouse.x) {
                    var radius = mouse.click ? 5 : 10;
                    buffer.lineWidth = 10;
                    buffer.strokeStyle = 'blue';
                    buffer.beginPath();
                    buffer.arc(mouse.x, mouse.y, radius,0,2*Math.PI);
                    buffer.stroke();
                    
                    if (mouse.click) {
                        buffer.moveTo(mouse.clickLocation.x, mouse.clickLocation.y);
                        buffer.lineTo(mouse.x,mouse.y);
                        buffer.stroke();
                        
                    }
                }
            }

        }

        return {
            initialise: initialise,
            render: render,
            resize: resize
        }
    }]);

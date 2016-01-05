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
        
        function initialise(screen, buffer) {
            screenCanvas = screen;
            height = $(screen).attr('height');
            width = $(screen).attr('width');
            
            screenContext = screenCanvas.getContext("2d");
            bufferCanvas = buffer;
            bufferContext = bufferCanvas.getContext("2d");
            
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

        function prepareRendering(callback) {
            var grd = bufferContext.createLinearGradient(0, 0, width, 0);
            grd.addColorStop(0, "red");
            grd.addColorStop(1, "white");

            bufferContext.fillStyle = grd;

            for (var i = 0; i<$gameWorldService.items().length; i++) {
                var item = $gameWorldService.items()[i];
                if (item.background) {
                    for (var y=0; y< 100; y++) {
                        for (var x=0; x< 100; x++ ){
                            bufferContext.drawImage(base_image, (x*181)- $cameraService.x, (y*190)- $cameraService.y);
                        }
                    }
                } else {
                    bufferContext.fillRect(item.x - $cameraService.x, item.y - $cameraService.y, 100, 100);
                }
            }
            
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
            
            callback && callback();
        }

        function display() {
            screenContext.drawImage(
                bufferCanvas,         //source
                0, 0, width, height,  //copy from source
                0, 0, width, height); //paste to target
        }

        return {
            initialise: initialise,
            prepareRendering: prepareRendering,
            display: display,
            resize: resize
        }
    }]);

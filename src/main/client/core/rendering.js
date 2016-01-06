'use strict';

angular.module('HandmadeHero.Rendering', [])
    .factory('renderingService', [function() {

        var screenCanvas;
        var screenContext;
        var bufferCanvas;
        var bufferContext;

        var height;
        var width;
        
        var renderer;

        function initialise(screen, buffer) {
            screenCanvas = screen;
            height = $(screen).attr('height');
            width = $(screen).attr('width');
            
            screenContext = screenCanvas.getContext("2d");
            bufferCanvas = buffer;
            bufferContext = bufferCanvas.getContext("2d");
        }

        function resize() {
            width = $(window).innerWidth();
            height = $(window).innerHeight();
            
            $(screenCanvas).attr('width', width)
                           .attr('height', height);
            
            $(bufferCanvas).attr('width', width)
                           .attr('height', height);
        }

        function setRenderer(newRenderer) {
            renderer = newRenderer;
        }
        
        function prepareRendering(callback) {
            renderer.prepareRendering(bufferContext, width, height);
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
            setRenderer: setRenderer,
            prepareRendering: prepareRendering,
            display: display,
            resize: resize
        }
    }]);

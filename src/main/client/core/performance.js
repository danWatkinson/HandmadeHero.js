'use strict';

angular.module('HandmadeHero.Performance', ['HandmadeHero.ApplicationState'])
    .factory('performanceService', ['$interval', 'applicationStateService', function($interval, $applicationStateService) {
        var start = window.performance.now();
        var lastTick = start;
        var fpsStack = [];

        function checkForFPSWarnings() {
            if (frameTime() > 16.66) {
                console.error('frameTime peaked >16.66');
                console.error(fpsStack);
            }
        }

        function tick() {
            var now = window.performance.now();
            var lastCycle = now - lastTick;
            lastTick = now;

            fpsStack.push(lastCycle);
            if (fpsStack.length > 100) {fpsStack.shift();}

            return now;
        }

        function fps() {
            return (1/ (frameTime()/1000) );
        }

        function frameTime() {
            var last100 =0;
            for (var i=0; i<fpsStack.length; i++) {
                last100 += fpsStack[i];
            }
            return (last100/100);
        }

        return {
            tick: tick,
            fps: fps,
            frameTime: frameTime,
            checkForFPSWarnings: checkForFPSWarnings
        }
    }]);

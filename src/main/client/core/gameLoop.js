'use strict';

angular.module('HandmadeHero.GameLoop', ['HandmadeHero.ApplicationState', 'HandmadeHero.Performance', 'HandmadeHero.Rendering', 'HandmadeHero.GameShutdown'])
      .factory('gameLoopService', ['applicationStateService', 'performanceService', 'renderingService', 'gameShutdownService', function($applicationStateService, $performanceService, $renderingService, $gameShutdownService) {

        var predictedFipTime_milliseconds = 5.1;
        var predictedLossToSetTimeout_milliseconds = 1;
        var desiredFrameRate_hz = 60;
        var targetElapsedTime_millieconds = (1000 / desiredFrameRate_hz);

        function loop() {
            if (!$applicationStateService.get('continueToRun')) {
                $gameShutdownService();
            } else {
                var loopStart = $performanceService.tick();
                $renderingService.prepareRendering(function() {
                    setTimeout(function() {
                        _tuneSleepAsBestWeCan(loopStart);
                        $renderingService.display();
                        loop();
                    },  _calculateSleep(loopStart) );
                });
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
                    elapsedForRendering_milliseconds = (window.performance.now() - loopStart);
                }
            }
        }
                                    
        return loop;
    }]);

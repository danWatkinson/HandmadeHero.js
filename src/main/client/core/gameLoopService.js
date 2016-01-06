'use strict';

angular.module('HandmadeHero.GameLoop', ['HandmadeHero.ApplicationState', 'HandmadeHero.Performance', 'HandmadeHero.InputProcessor', 'HandmadeHero.GameEvents', 'HandmadeHero.Screen.RenderingService', 'HandmadeHero.GameShutdown'])
      .factory('gameLoopService', ['applicationStateService', 'performanceMonitoringService', 'inputProcessorService', 'gameEventService', 'renderingService', 'gameShutdownService', function($applicationStateService, $performanceMonitoringService, $inputProcessorService, $gameEventService, $renderingService, $gameShutdownService) {

        function loop() {
            var loopStart = $performanceMonitoringService.tick();
            
            if ($applicationStateService.get('continueToRun')) {
                _loop();
            } else {
                $gameShutdownService();
            }

            function _loop() {
                $inputProcessorService.generateInputEvents();
                $gameEventService.processEvents();
                
                $renderingService.prepareRendering(function() {
                    setTimeout(function() {
                        _tuneSleepAsBestWeCan(loopStart);
                        $renderingService.display();
                        loop();
                    },  _calculateSleep(loopStart) );
                });
            }

            var predictedFipTime_milliseconds = 5.1;
            var predictedLossToSetTimeout_milliseconds = 1;
            var desiredFrameRate_hz = 60;
            var targetElapsedTime_milliseconds = (1000 / desiredFrameRate_hz);

            function _calculateSleep(startTime_milliseconds) {
                var elapsedForRendering_milliseconds = (window.performance.now() - startTime_milliseconds);
                var sleepTime_milliSeconds = ((targetElapsedTime_milliseconds - elapsedForRendering_milliseconds) );
                var sleep = Math.floor(sleepTime_milliSeconds) - predictedFipTime_milliseconds - predictedLossToSetTimeout_milliseconds;
                return sleep;
            }

            function _tuneSleepAsBestWeCan(startTime_milliseconds) {
                var elapsedForRendering_milliseconds = (window.performance.now() - startTime_milliseconds);
                while (elapsedForRendering_milliseconds < (targetElapsedTime_milliseconds - predictedFipTime_milliseconds) ) {
                    elapsedForRendering_milliseconds = (window.performance.now() - loopStart);
                }
            }
        }
                                    
        return loop;
    }]);

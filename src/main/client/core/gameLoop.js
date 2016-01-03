'use strict';

angular.module('HandmadeHero.GameLoop', ['HandmadeHero.ApplicationState', 'HandmadeHero.Performance', 'HandmadeHero.Rendering', 'HandmadeHero.GameShutdown'])
      .factory('gameLoopService', ['applicationStateService', 'performanceService', 'renderingService', 'gameShutdownService', function($applicationStateService, $performanceService, $renderingService, $gameShutdownService) {
                                    
        function repeat() {
            if ($applicationStateService.get('continueToRun')) {
                loop();
            } else {
                $gameShutdownService();
            }
        }

        function loop() {
            $performanceService.tick();
            $renderingService.render(repeat);
        }
                                    
        return loop;
    }]);

'use strict';

angular.module('HandmadeHero', [
  'HandmadeHero.GameWorld',
  'HandmadeHero.GameLoop',
  'HandmadeHero.GameMode',
  'HandmadeHero.ApplicationState',
  'HandmadeHero.Performance',
  'HandmadeHero.Screen'
])
.run(['$interval', 'gameWorldService', 'applicationStateService', 'performanceMonitoringService', 'gameModeService', 'gameLoopService', function($interval, $gameWorldService, $applicationStateService, $performanceMonitoringService, $gameModeService, $gameLoopService) {
    setupFPSWarning();
    setGameMode();
    initialiseTheWorld();
    start();

    function setGameMode() {
        $gameModeService.mode('test');
    }

    function setupFPSWarning() {
        $applicationStateService.interval($interval($performanceMonitoringService.checkForFPSWarnings, 1000));
    }

    function initialiseTheWorld() {
        $gameWorldService.initialise();
    }

    function start() {
        $applicationStateService.set('continueToRun', true);
        $gameLoopService();
    }
}]);


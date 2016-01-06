'use strict';

angular.module('HandmadeHero', [
  'HandmadeHero.GameController',
  'HandmadeHero.GameMode',
  'HandmadeHero.ApplicationState',
  'HandmadeHero.Performance'
])
.run(['$interval', 'applicationStateService', 'performanceMonitoringService', 'gameModeService', function($interval, $applicationStateService, $performanceMonitoringService, $gameModeService) {
    setupFPSWarning();
    setGameMode();
        
    function setGameMode() {
        $gameModeService.mode('test');
    }
        
    function setupFPSWarning() {
        $applicationStateService.interval($interval($performanceMonitoringService.checkForFPSWarnings, 1000));
    }
}]);


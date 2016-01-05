'use strict';

angular.module('HandmadeHero', [
  'HandmadeHero.GameController',
  'HandmadeHero.GameMode',
  'HandmadeHero.ApplicationState',
  'HandmadeHero.Performance'
])
.run(['$interval', 'applicationStateService', 'performanceService', 'gameModeService', function($interval, $applicationStateService, $performanceService, $gameModeService) {
    setupFPSWarning();
    setGameMode();
        
    function setGameMode() {
        $gameModeService.mode('test');
    }
        
    function setupFPSWarning() {
        $applicationStateService.interval($interval($performanceService.checkForFPSWarnings, 1000));
    }
}]);


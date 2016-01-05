'use strict';

angular.module('HandmadeHero', [
  'HandmadeHero.GameController',
  'HandmadeHero.ApplicationState',
  'HandmadeHero.Performance'
])
.run(['$interval', 'applicationStateService', 'performanceService', function($interval, $applicationStateService, $performanceService) {
    setupFPSWarning();

    function setupFPSWarning() {
        $applicationStateService.interval($interval($performanceService.checkForFPSWarnings, 1000));
    }
}]);


'use strict';

angular.module('HandmadeHero.GameStartup', ['HandmadeHero.ApplicationState', 'HandmadeHero.GameWorld', 'HandmadeHero.Screen.RenderingService'])
    .factory('gameStartupService', ['applicationStateService', 'gameWorldService', 'renderingService', function($applicationStateService, $gameWorldService) {

        return function startup() {
            $gameWorldService.initialise();
            $applicationStateService.set('continueToRun', true);
        };
    }]);

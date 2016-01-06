'use strict';

angular.module('HandmadeHero.GameStartup', ['HandmadeHero.ApplicationState', 'HandmadeHero.GameWorld', 'HandmadeHero.Rendering', 'HandmadeHero.Input'])
    .factory('gameStartupService', ['applicationStateService', 'gameWorldService', 'renderingService', 'inputService', function($applicationStateService, $gameWorldService, $renderingService, $inputService) {

        return function startup() {
            _applyWindowEventListeners();
            _initialiseGameServices();
        };

        function _applyWindowEventListeners() {
            $(window).resize($renderingService.resize);

            $(document).bind('keydown', $inputService.keydown);
            $(document).bind('keyup', $inputService.keyup);
            $(document).bind('mousemove', $inputService.mousemove);
            $(document).bind('mouseup', $inputService.mouseup);
            $(document).bind('mousedown', $inputService.mousedown);

            $('body').css('cursor', 'none');
        }

        function _initialiseGameServices() {
            $gameWorldService.initialise();
            $applicationStateService.set('continueToRun', true);

            $renderingService.initialise(
                document.getElementById("screen"),
                document.getElementById("buffer")
            );

            $renderingService.resize();
        }

    }]);

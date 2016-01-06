'use strict';

angular.module('HandmadeHero.GameStartup', ['HandmadeHero.ApplicationState', 'HandmadeHero.GameWorld', 'HandmadeHero.Screen.RenderingService', 'HandmadeHero.Input.KeyboardHandler', 'HandmadeHero.Input.MouseHandler'])
    .factory('gameStartupService', ['applicationStateService', 'gameWorldService', 'renderingService', 'keyboardHandler', 'mouseHandler', function($applicationStateService, $gameWorldService, $renderingService, $keyboardHandler, $mouseHandler) {

        return function startup() {
            _applyWindowEventListeners();
            _initialiseGameServices();
        };

        function _applyWindowEventListeners() {
            $(window).resize($renderingService.resize);

            $(document).bind('keydown', $keyboardHandler.keydown);
            $(document).bind('keyup', $keyboardHandler.keyup);
            
            $(document).bind('mousemove', $mouseHandler.mousemove);
            $(document).bind('mouseup', $mouseHandler.mouseup);
            $(document).bind('mousedown', $mouseHandler.mousedown);

            $('body').css('cursor', 'none');
        }

        function _initialiseGameServices() {
            $gameWorldService.initialise();
            $applicationStateService.set('continueToRun', true);
        }

    }]);

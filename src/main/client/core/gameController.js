'use strict';

angular.module('HandmadeHero.GameController', ['HandmadeHero.GameStartup', 'HandmadeHero.GameLoop'])
    .controller('gameController', ['gameStartupService', 'gameLoopService', function($gameStartupService, $gameLoopService) {

        $gameStartupService();
        $gameLoopService();

    }]);

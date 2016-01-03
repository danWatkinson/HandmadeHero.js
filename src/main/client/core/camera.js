'use strict';

angular.module('HandmadeHero.Camera', [])
    .factory('cameraService', [function() {

        var cameraLocation = {
            x: 2500,
            y: 2500,
            z: 500
        };
        
        return cameraLocation;
    }]);

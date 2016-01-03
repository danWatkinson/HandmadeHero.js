'use strict';

angular.module('HandmadeHero.GameWorld', [])
    .factory('gameWorldService', [function() {
        
        var worldItems;
        
        function initialise() {
            worldItems = [];
            
            worldItems.push({
                x: 0,
                y: 0,
                background: 'assets/images/baize.jpg'
            });
            for (var i = 1; i < 500; i++) {
                worldItems.push({
                    x: (Math.random() * (5000)),
                    y: (Math.random() * (5000))
                });
            }
        }
        
        function items() {
            return worldItems;
        }

        return {
            initialise: initialise,
            items: items
        }
    }]);

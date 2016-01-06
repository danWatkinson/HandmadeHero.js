'use strict';

angular.module('HandmadeHero.GameWorld', [])
    .factory('gameWorldService', [function() {
        
        var worldItems = [];
        var worldAssets = {};
        
        function initialise() {
            
            _loadAssets();
            _loadItems();
            
            function _loadAssets() {
                var image = new Image();
                image.src = '/assets/images/baize.jpg';
                image.onload = function() {
                    //TODO   - wrap into an asset service perhaps?
                    //console.log('!');
                };
                worldAssets['/assets/images/baize.jpg'] = image;
            }

            function _loadItems() {
                worldItems.push({
                    background: 'assets/images/baize.jpg'
                });
                for (var i = 1; i < 500; i++) {
                    worldItems.push({
                        x: (Math.random() * (5000)),
                        y: (Math.random() * (5000))
                    });
                }
            }
        }
        
        function items() {
            return worldItems;
        }

        function assets() {
            return worldAssets;
        }

        return {
            initialise: initialise,
            items: items,
            assets: assets
        }
    }]);

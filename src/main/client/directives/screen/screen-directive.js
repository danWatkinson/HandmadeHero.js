'use strict';

angular.module('HandmadeHero.Screen.ScreenDirective', ['HandmadeHero.Screen.RenderingService'])
    .directive('screen', ['renderingService', function($renderingService) {

        function compile( element, attributes, transclude ) {
            var id = element.attr('id');
            var buffer = '<canvas id="' + id + '_buffer"  ng-hide="true"></canvas>';
            element.prepend(buffer);

            $renderingService.initialise(id);

            return( link );
        }

        function link( $scope, element, attributes ) {

        }

        return({
            compile: compile,
            restrict: 'A'
        })
    }]);
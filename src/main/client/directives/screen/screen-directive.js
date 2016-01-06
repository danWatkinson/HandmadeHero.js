'use strict';

angular.module('HandmadeHero.Screen.screenDirective', ['HandmadeHero.Rendering'])
    .directive('screen', ['renderingService', function($renderingService) {

        function compile( element, attributes, transclude ) {
            var id = attributes['id'];
            var buffer = '<canvas id="' + id + '_buffer"  ng-hide="true"></canvas>';
            element.prepend(buffer);

            $renderingService.initialise(attributes.id);
            $renderingService.resize();

            return( link );
        }

        function link( $scope, element, attributes ) {

        }

        return({
            compile: compile,
            restrict: 'A'
        })
    }]);
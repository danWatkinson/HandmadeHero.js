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
            
//            var children = element.children()
//                .removeClass('fadeIn')
//                .addClass('fadedOut');
//
//            $scope.$on('displayChild', function(event, index) {
//
//                element
//                    .find(":nth-child("+ index +")")
//                        .removeClass('fadedOut')
//                        .addClass('fadeIn');
//
//                if (index < children.length) {
//                    setTimeout(function() {
//                        $scope.$emit('displayChild', ++index);
//                    }, 1000);
//                }
//
//            });

            $scope.$emit('displayChild', 0);
        }

        // Return the directive configuration.
        return({
            compile: compile,
            restrict: 'A'
        })
    }]);
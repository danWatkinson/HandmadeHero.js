'use strict';

angular.module('HandmadeHero.GameShutdown', ['HandmadeHero.ApplicationState'])
    .factory('gameShutdownService', ['$interval', 'applicationStateService', function($interval, $applicationStateService) {

        return function shutdown() {
            var intervals = $applicationStateService.intervals();
            while(intervals.length){
                $interval.cancel(intervals.pop());
            }
            $(document).unbind('keydown');
            $(document).unbind('keyup');
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
            $(document).unbind('mousedown');
        }
    }]);

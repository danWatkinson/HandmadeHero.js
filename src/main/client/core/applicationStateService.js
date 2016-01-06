'use strict';

angular.module('HandmadeHero.ApplicationState', [])
    .factory('applicationStateService', ['$interval', function($interval) {
        var applicationState = {};
        var intervalReferences = [];
        
        function interval(myFunction, interval) {
            intervalReferences.push($interval(myFunction, interval));
        }
        
        function shutdown() {
            while(intervalReferences.length){
                $interval.cancel(intervalReferences.pop());
            }
            $(document).unbind('keydown');
            $(document).unbind('keyup');
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
            $(document).unbind('mousedown');
        }
        
        return {
            set: function(key, value) {applicationState[key] = value;},
            get: function(key) {return applicationState[key];},
            interval: interval,
            shutdown: shutdown
        }
    }]);

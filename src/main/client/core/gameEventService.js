'use strict';

angular.module('HandmadeHero.GameEvents', [])
    .factory('gameEventService', [function() {
        
        var eventLog = [];
        var eventProcessor = {processEvent: function(){}};
        
        function setEventProcessor(newEventProcessor) {
            eventProcessor = newEventProcessor;
        }
        
        function event(gameEvent) {
            eventLog.push(gameEvent);
        }
        
        function processEvents() {
            var numberOfEvents = eventLog.length;
            for (var i=0; i<numberOfEvents; i++) {
                eventProcessor.processEvent(eventLog.shift());
            }
        }
        
        return {
            setEventProcessor: setEventProcessor,
            event: event,
            processEvents: processEvents
        }
    }]);



'use strict';

angular.module('HandmadeHero.ApplicationState', [])
    .factory('applicationStateService', [function() {
        var applicationState = {};
        var intervalReferences = [];
        
        return {
            set: function(key, value) {applicationState[key] = value;},
            get: function(key) {return applicationState[key];},
            interval: function(intervalReference) {intervalReferences.push(intervalReference)},
            intervals: function() {return intervalReferences}
        }
    }]);

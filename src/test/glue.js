"use strict";
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

module.exports = {
    test : {
        expect: expect
    },

    aDummyExpressApp: function() {
        var dummyExpressApp = {
            configuredNVPs: {},
            set: function(name, value) {this.configuredNVPs[name] = value},
            use: sinon.spy(),
            get: function(name) {return this.configuredNVPs[name]}
        };

        sinon.spy(dummyExpressApp, 'set');
        sinon.spy(dummyExpressApp, 'get');

        return dummyExpressApp;
    },
    
    aDummyHttpServer: function() {
        var dummyHttpServer = {
            listen: sinon.spy()
        };

        return dummyHttpServer;
    }

};
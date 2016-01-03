"use strict";

var test = require("../../glue").test;
var sinon = require("sinon");

var express = require('express');

var dummyExpressApp = require("../../glue").aDummyExpressApp();

describe('configure', function() {

    var configure = require("../../../main/server/launcher/configure");

    describe('configure(app, opts)', function () {

        it('should use opts.public', function () {
            var opts = {
                public: express.static( '/aPath' )
            };
            
            configure(dummyExpressApp, opts);
            
            test.expect( dummyExpressApp.use).to.have.been.calledWith( opts.public );
        });
    });
});
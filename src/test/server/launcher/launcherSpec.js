"use strict";

var test = require("../../glue").test;
var sinon = require("sinon");

var http = require('http');
var dummyHttpServer = require("../../glue").aDummyHttpServer();

describe('launcher', function() {
    
    var launcher = require("../../../main/server/launcher/launcher.js");

    describe('launch(http, opts)', function(){
        
        it('should start an http server listening on port : opts.port', function() {
            var opts = {
                port: 1234
            };
            
            launcher.launch(dummyHttpServer, opts);
            
            test.expect( dummyHttpServer.listen ).to.have.been.calledWith( 1234 );
        });

    });
});

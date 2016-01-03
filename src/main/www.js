"use strict";

var http = require('http');
var express = require('express');
var path = require('path');

var configure = require('./server/launcher/configure');
var launcher = require('./server/launcher/launcher');

var opts = {
    port: normalizePort(process.env.PORT || '3000'),
    public: express.static( path.join(__dirname, 'client') )
};

var app = express();
configure(app, opts);
launcher.launch( http.createServer( app ), opts );

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

"use strict";

module.exports = function configure(expressApp, opts) {
    expressApp.use( opts.public );
};

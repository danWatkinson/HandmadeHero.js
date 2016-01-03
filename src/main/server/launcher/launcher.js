"use strict";

module.exports = {
    launch: function (http, opts) {
        http.listen( opts.port );
    }
};

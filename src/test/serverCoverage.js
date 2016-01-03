//TODO - there must be a better way...

var fs = require('fs');
var path = require('path');
var sinon = require("sinon");

var jsdom = require("jsdom").jsdom;
global.document = jsdom('<!DOCTYPE html><html ng-app="microHubServiceClient" ng-controller="applicationController"><head><body><div ng-include="currentContentPane"></div></body></html>', {});
global.window = global.document;


var aDummyModule = {
    controller: sinon.spy()
};

global.window.angular = {
    module: sinon.stub().returns(aDummyModule)
};

requireAllFilesIn(path.join( __dirname, '../main/server'));
requireAllFilesIn(path.join( __dirname, './server'));

function requireAllFilesIn(dir) {
    var list = fs.readdirSync(dir);

    for (var i=0; i< list.length; i++) {
        var file = path.join(dir, list[i]);

        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (file.indexOf('/public') <0) {
                requireAllFilesIn(file);
            }
        } else {
            if (file.lastIndexOf('.js') >0) {
                console.log('requiring: ' + file);
                require(file);
            }
        }
    }
};
var jasmineReporters = require('jasmine-reporters');

exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'firefox'
  },

  baseUrl: 'http://localhost:3000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },
    
  onPrepare: function() {
      var jasmineReporters = require('jasmine-reporters');
      jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
          consolidateAll: true,
          savePath: 'testresults',
          filePrefix: 'xmloutput'
      }));
  }
};

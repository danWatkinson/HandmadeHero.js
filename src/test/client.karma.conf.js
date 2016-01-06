module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      '../main/client/bower_components/angular/angular.js',
      '../main/client/bower_components/angular-mocks/angular-mocks.js',
      '../main/client/app.js',
      '../main/client/core/**/*.js',
      '../main/client/directives/**/*.js',
      '../main/client/input/**/*.js',

      './client/**/*.js',
      './client/core/**/*.js',
      './client/directives/**/*.js',
      './client/input/**/*.js'
    ],
    preprocessors: {
        '../main/client/app.js': 'coverage',
        '../main/client/core/**/*.js': 'coverage',
        '../main/client/directives/**/*.js': 'coverage',
        '../main/client/input/**/*.js': 'coverage'
    },
    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Firefox'],

    plugins : [
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],
    reporters: [
        'progress',
        'coverage'
    ],
    coverageReporter: {
        type : 'html',
        dir : '../../coverage/client/'
    }
  });
};

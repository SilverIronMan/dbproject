module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    files: [
      'test/unit/*.js',
      'public/app/**/*.js',
      'public/index.html',
      'public/assets/lib/angular/angular.min.js',
      'public/assets/lib/d3/d3.min.js',
    ],
    exclude: [
    ],
    preprocessors: {
      'public/**/*.js': ['coverage']
    },
    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['PhantomJS'],
    plugins: ['karma-phantomjs-launcher', 'karma-jasmine', 'karma-coverage'],
    singleRun: true,
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
  });
};

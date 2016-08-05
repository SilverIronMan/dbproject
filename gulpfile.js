const gulp = require('gulp');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const Karma = require('karma').Server;


const sassFiles = './public/assets/sass/*.scss';

// ES Lint (using Airbnb)
gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**', '!./public/assets/**', '!bower_components/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Runs the tests found in the test folder
gulp.task('test', () => {
  new Karma({
    configFile: __dirname + '/karma.conf.js',
  }).start();
});

// Copy Files
gulp.task('dependencies', () => {
  gulp.src('./bower_components/**/*', { base: './bower_components' })
    .pipe(gulp.dest('./public/assets/lib'));
});

// Compile the SCSS
gulp.task('sass', () => {
  return gulp.src(sassFiles)
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./public/assets/css'));
});

// Watch the SCSS
gulp.task('sass-watch', () => {
  gulp.watch(sassFiles, ['sass']);
});

// Start the server
gulp.task('start', () => {
  nodemon({
    script: './server/server.js',
    ext: 'js json html',
    env: { 'NODE_ENV': 'development' },
  });
});

gulp.task('default', ['dependencies', 'sass', 'sass-watch', 'start']);

const gulp = require('gulp');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const rename = require('gulp-rename');
const Karma = require('karma').Server;
const path = require('path');

const jsLintFiles = ['**/*.js', '!node_modules/**', '!./public/assets/**',
  '!./public/lib/**', '!coverage/**',
  '!server/tone-analyzer/**'];
const sassFiles = './sass/*.scss';

/**
 * Tests
 */

// Runs the tests found in the test folder
gulp.task('test', () => {
  new Karma({
    configFile: path.join(__dirname, '/karma.conf.js'),
  }).start();
});

/**
 * Development Enviroment
 */

// Compile the SCSS
gulp.task('sass', () => {
  return gulp.src(sassFiles)
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./public/assets/css'));
});

// Watch the SCSS
gulp.task('sass-watch', ['sass'], () => {
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

// ES Lint (using Airbnb)
gulp.task('lint', () => {
  return gulp.src(jsLintFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// ES Lint (using Airbnb)
gulp.task('lint-watch', () => {
  gulp.watch(jsLintFiles, ['lint']);
});

gulp.task('default', ['sass-watch', 'start', 'lint-watch']);

gulp.task('no-lint', ['sass-watch', 'start']);

/**
 * Production Enviroment
 */

gulp.task('sass:prod', () => {
  return gulp.src(sassFiles)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('prod', ['sass:prod', 'start']);

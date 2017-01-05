const gulp = require('gulp');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const rename = require('gulp-rename');
const processhtml = require('gulp-processhtml');
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

gulp.task('html', () => {
  return gulp.src('./public/index-build.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./public/'));
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

gulp.task('default', ['sass-watch', 'html', 'start', 'lint-watch']);

gulp.task('run-no-lint', ['sass-watch', 'html', 'start']);

/**
 * Production Enviroment
 */

gulp.task('sass:prod', () => {
  return gulp.src(sassFiles)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('html:prod', () => {
  return gulp.src('./public/index-build.html')
    .pipe(processhtml())
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./public/'));
});

gulp.task('prod', ['html:prod', 'sass:prod', 'start']);

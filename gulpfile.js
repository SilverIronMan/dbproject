const gulp = require('gulp');
// const minifyCss = require("gulp-minify-css");
// const sass = require("gulp-sass");
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(['**/*.js', '!node_modules/**'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

/* // task
gulp.task('compile-sass', function () {
  gulp.src('./Sass/one.sass') // path to your file
  .pipe(sass())
  .pipe(gulp.dest('path/to/destination'));
}); */

/* // task
gulp.task('minify-css', function () {
  gulp.src('./Css/one.css') // path to your file
  .pipe(minifyCss())
  .pipe(gulp.dest('path/to/destination'));
});*/

gulp.task('default', () => {
  return true;
});

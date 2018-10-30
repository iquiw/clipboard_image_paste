const gulp = require('gulp');
const npmDist = require('gulp-npm-dist');
const rename = require('gulp-rename');

function copyfunc(dest, excludes) {
  return function () {
    gulp.src(npmDist({ excludes: excludes }), { base:'./node_modules' })
      .pipe(rename(function(path) {
        path.dirname = path.dirname.replace(/.*[\\\/]dist/, '');
      }))
      .pipe(gulp.dest(dest));
  };
}

gulp.task('copy:js', copyfunc('assets/javascripts', [
  '*.css',
  '*.dev.js'
]));

gulp.task('copy:css', copyfunc('assets/stylesheets', [
  '*.dev.css',
  '*.js'
]));

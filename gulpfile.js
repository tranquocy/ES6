var gulp = require('gulp');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var webpack = require('gulp-webpack');
var
  source = 'src/',
  dest = 'dest/';

var options = {
  browserSync: {
    server: {
      baseDir: dest
    }
  }
}

/**
 * Tasks
 * Allow add filter
 *
 */
gulp.task('browser-sync', function() {
  return browserSync.init(options.browserSync);
});

gulp.task('webpack', function() {
  return gulp.src('src/main.js')
    .pipe(webpack())
    .pipe(gulp.dest('dest/'));
});

gulp.task('compile', function () {
  return gulp.src('src/main.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(dest));
});

gulp.task('copy', function (cb) {
  return gulp.src('*.html')
    .pipe(gulp.dest(dest));
});

gulp.task('watch', function (cb) {
  $.watch(source + '*.js', function () {
    return runSequence('compile', browserSync.reload);
  })

});


gulp.task('default', ['compile', 'copy', 'watch', 'webpack', 'browser-sync']);

gulp.task('dev', function (cb) {
  return runSequence(
    'default'
  )
});
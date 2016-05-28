'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

var config = {
  bootstrapDir: './node_modules/bootstrap',
  publicDir: '../Public',
};

gulp.task('css', function() {
  return gulp.src('./main.scss')
    .pipe(sass({
      includePaths: [config.bootstrapDir + '/scss'],
    }))
    .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('clean-css', ['css'], function() {
  return gulp.src([
      config.publicDir + '/css/*.css',
      '!' + config.publicDir + '/css/*.min.css'
    ])
    .pipe(cleanCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('copy-bootsrap-js', function() {
  return gulp.src(config.bootstrapDir + '/dist/js/bootstrap.min.js')
    .pipe(gulp.dest(config.publicDir + '/javascripts'));
});

gulp.task('default', [
  'css',
  'clean-css',
  'copy-bootsrap-js',
]);

var gulp = require('gulp');
var concat = require('gulp-concat');
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var files = ['./src/DOMTokenList.js', './src/classList.js', './src/relList.js'];

gulp.task('concat', function () {
    gulp.src(files)
        .pipe(concat('domtokenlist.js'))
        .pipe(header('/*! DOMTokenlist shim | Copyright <%= year %> Jonathan Wilsson. */\n', {
            year: new Date().getFullYear()
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('jshint', function () {
    return gulp.src(files)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('uglify', ['concat'], function () {
    return gulp.src('./dist/domtokenlist.js')
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['jshint', 'uglify']);

var gulp = require('gulp');
var concat = require('gulp-concat');
var header = require('gulp-header');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var size = require('gulp-size');
var uglify = require('gulp-uglify');

var files = ['src/DOMTokenList-newest.js', 'src/DOMTokenList.js', 'src/classList.js', 'src/relList.js', 'src/svg.classList.js'];

gulp.task('build', function () {
    return gulp.src(files)
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('domtokenlist.js'))
        .pipe(header('/*! DOMTokenlist shim | Copyright <%= new Date().getFullYear() %> Jonathan Wilsson and Bogdan Chadkin. */\n'))
        .pipe(size({
            showFiles: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(size({
            showFiles: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('dev', ['build'], function () {
    gulp.watch(files, ['build'])
});

gulp.task('default', ['build']);

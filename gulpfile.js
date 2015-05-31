var gulp = require('gulp');
var concat = require('gulp-concat');
var header = require('gulp-header');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var size = require('gulp-size');
var uglify = require('gulp-uglify');

var files = './src/**/*.js';

gulp.task('concat', ['lint'], function () {
    return gulp.src(files)
        .pipe(concat('domtokenlist.js'))
        .pipe(header('/*! DOMTokenlist shim | Copyright <%= new Date().getFullYear() %> Jonathan Wilsson and Bogdan Chadkin. */\n'))
        .pipe(size({
            showFiles: true
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('lint', function () {
    return gulp.src(files)
        .pipe(jscs())
        .on('error', function (err) {
            console.log(err.message);
        })
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('uglify', ['concat'], function () {
    return gulp.src('dist/domtokenlist.js')
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(size({
            showFiles: true
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['default'], function () {
    gulp.watch(files, ['default']);
});

gulp.task('default', ['uglify']);

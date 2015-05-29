var gulp = require('gulp');
var concat = require('gulp-concat');
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var size = require('gulp-size');

var files = ['src/DOMTokenList-newest.js', 'src/DOMTokenList.js', 'src/classList.js', 'src/relList.js'];

gulp.task('concat', function () {
    return gulp.src(files)
        .pipe(concat('domtokenlist.js'))
        .pipe(header('/*! DOMTokenlist shim | Copyright <%= year %> Jonathan Wilsson and Bogdan Chadkin. */\n', {
            year: new Date().getFullYear()
        }))
        .pipe(size({
            showFiles: true
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('jshint', function () {
    return gulp.src(files)
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

gulp.task('dev', function () {
    gulp.start('default');
    gulp.watch(files, ['default']);
});

gulp.task('default', ['jshint', 'uglify']);

var gulp = require('gulp');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var footer = require('gulp-footer');
var header = require('gulp-header');
var iife = require('gulp-iife');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var umd = require('gulp-umd');

var copyright = '/*! DOMTokenlist shim | Copyright <%= new Date().getFullYear() %> Jonathan Wilsson and Bogdan Chadkin. */\n';
var files = ['src/DOMTokenList-newest.js', 'src/DOMTokenList.js', 'src/classList.js', 'src/relList.js', 'src/svg.classList.js'];

gulp.task('lint', function () {
    return gulp.src(files)
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
});

gulp.task('build', ['lint'], function () {
    var f = filter('DOMTokenList.js', {
        restore: true,
    });

    return gulp.src(files)
        .pipe(f)
        .pipe(footer('window.DOMTokenList = DOMTokenList;'))
        .pipe(iife({
            params: ['window'],
            prependSemicolon: false,
            useStrict: false,
        }))
        .pipe(header(";typeof window !== 'undefined' && "))
        .pipe(f.restore)
        .pipe(concat('domtokenlist.js'))
        .pipe(header(copyright))
        .pipe(size({
            showFiles: true,
        }))
        .pipe(gulp.dest('dist'))
        .pipe(uglify({
            preserveComments: 'some',
        }))
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(size({
            showFiles: true,
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-umd', ['lint'], function () {
    return gulp.src('src/DOMTokenList.js')
        .pipe(concat('domtokenlist-umd.js'))
        .pipe(umd({
            exports: function(file) {
                return 'DOMTokenList';
            },
            namespace: function(file) {
                return 'DOMTokenList';
            },
        }))
        .pipe(header(copyright))
        .pipe(gulp.dest('dist'))
        .pipe(uglify({
            preserveComments: 'some',
        }))
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('dev', ['build', 'build-umd'], function () {
    gulp.watch(files, ['build', 'build-umd'])
});

gulp.task('default', ['build', 'build-umd']);

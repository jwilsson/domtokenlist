var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglifyjs');

gulp.task('jshint', function () {
    return gulp.src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('uglify', function () {
    return gulp.src(['./src/DOMTokenList.js', './src/classList.js', './src/relList.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['jshint', 'uglify']);

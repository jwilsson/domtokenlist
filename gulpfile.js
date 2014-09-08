var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglifyjs');
var files = ['./src/DOMTokenList.js', './src/classList.js', './src/relList.js'];

gulp.task('jshint', function () {
    return gulp.src(files)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('uglify', function () {
    return gulp.src(files)
        .pipe(uglify('DOMTokenList.js', {
            output: {
                comments: /^!/
            }
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['jshint', 'uglify']);

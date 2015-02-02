var gulp  = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// Define paths
var dirSrc  = global.paths.src  + '/static/scss';
var dirDist = global.paths.dist + '/static/css';
var srcGlob = dirSrc + '/**/!(_)*.scss';

module.exports.compile = function() {
    gulp.src(srcGlob)
        .pipe(sourcemaps.init())
        .pipe(sass({ errLogToConsole: true }))
        .pipe(sourcemaps.write({ sourceRoot: '.' }))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(autoprefixer('last 1 version', '> 5%'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dirDist));
};

module.exports.watch = function() {
    gulp.watch(srcGlob, ['css-compile']);
};

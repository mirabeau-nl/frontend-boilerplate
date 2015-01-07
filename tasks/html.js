var gulp = require('gulp');
var swig = require('gulp-swig');

// Define paths
var srcGlob = global.paths.src  + '/pages/**/*.html';
var dirDist = global.paths.dist + '/pages';

module.exports.compile = function() {
    gulp.src(srcGlob)
        .pipe(swig())
        .pipe(gulp.dest(dirDist));
};

module.exports.watch = function() {
    gulp.watch(srcGlob, ['html-compile']);
};

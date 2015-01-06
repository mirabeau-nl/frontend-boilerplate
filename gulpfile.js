var gulp  = require('gulp');

global.paths = {
    src:  __dirname + '/src',
    dist: __dirname + '/dist'
};

// Serve static files from dist/ folder
gulp.task('connect', require('./tasks/connect'));

// Swig to HTML compiler
gulp.task('html-compile',                 require('./tasks/html').compile);
gulp.task('html-watch', ['html-compile'], require('./tasks/html').watch);

// Sass & Autoprefixer to CSS compiler
gulp.task('css-compile',                require('./tasks/css').compile);
gulp.task('css-watch', ['css-compile'], require('./tasks/css').watch);

// Group-task
gulp.task('dev', ['connect', 'html-watch', 'css-watch']);

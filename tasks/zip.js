var config = require('../config');
var gulp   = require('gulp');
var zip    = require('gulp-zip');
var fs     = require('fs');

/**
 * Task: Add content to zip archive
 */
gulp.task('zip', function() {
    return gulp.src([config.zip.src.all])
        .pipe(zip(config.zip.filename))
        .pipe(gulp.dest(config.zip.dist.base))
        .on('end', updateIndex);
});

/**
 * Place link to zip in the documentation overview
 */
function updateIndex() {

    // Read generated index.html
    var html = fs.readFileSync(config.docs.dist.index, {encoding: 'utf8'});

    // Replace html comment with link
    var linkHTML = '<p><a href="#">Download ZIP</a></p>'.replace('#', config.zip.filename);
    html = html.replace('<!--[[dist.zip]]-->', linkHTML);

    // Write new html
    fs.writeFileSync(config.docs.dist.index, html);
}

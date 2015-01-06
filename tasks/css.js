var fs       = require('fs');
var path     = require('path');
var glob     = require('glob');
var mkdirp   = require('mkdirp');
var sass     = require('node-sass');
var prefixer = require('autoprefixer-core')({ browsers: ['last 4 versions'] });

// Define paths
var dirSrc  = global.paths.src  + '/static/scss';
var dirDist = global.paths.dist + '/static/css';
var srcGlob = dirSrc + '/**/!(_)*.scss';
var dist    = dirDist + '/css';

// Embed sourcemaps as data uri?
var sourceMap = true;

module.exports.compile = function() {

    glob.sync(srcGlob).forEach(function(file) {

        // Build final filename
        var basename = path.relative(dirSrc, file).replace(/\.scss$/, '');
        var outFile  = dist + '/' + basename + '.css';

        // Compile Sass to CSS with embedded sourcemap
        sass.render({
            file: file,
            outFile: outFile,
            sourceMap: sourceMap,
            sourceMapEmbed: true,
            success: function(sassResult) {

                // Post-process with Autoprefixer
                var prefixerResult = prefixer.process(sassResult.css, {
                    to: outFile
                });

                // Write out result
                mkdirp.sync(path.dirname(outFile));
                fs.writeFile(outFile, prefixerResult.css, function(err) {
                    if (err) console.error(err);
                });
            }
        });
    });
};

module.exports.watch = function() {};

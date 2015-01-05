var fs       = require('fs');
var path     = require('path');
var glob     = require('glob');
var mkdirp   = require('mkdirp');
var sass     = require('node-sass');
var prefixer = require('autoprefixer-core')({ browsers: ['last 4 versions'] });

// Define paths
var dirSrc  = global.paths.src + '/static/scss';
var dirDest = global.paths.dest + '/static/css';
var srcGlob = dirSrc + '/**/!(_)*.scss';
var dest    = dirDest + '/css';

// Embed sourcemaps as data uri?
var sourceMap = true;

module.exports.compile = function() {

    glob.sync(srcGlob).forEach(function(file) {

        // Build final filename
        var basename = path.relative(dirSrc, file).replace(/\.scss$/, '');
        var outFile  = dest + '/' + basename + '.css';

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

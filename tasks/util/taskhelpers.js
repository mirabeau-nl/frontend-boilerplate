import { js as config, moduleLoader } from '../../config';
import { readFileSync, writeFileSync } from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import uglifyjs from 'uglify-js';
import browserify from 'browserify';
import through from 'through2';
import babelify from 'babelify';

module.exports = {

    /**
     * Capture which babel helpers are actually used
     * @param {Object} result - The result object created by Browserify
     * @param {String[]} usedBabelHelpers - The array of babel helpers, passed by reference
     * @returns {Transform} - A Node.js streams3 transform stream
     */
    collectUsedBabelHelpers: (result, usedBabelHelpers) => { /* eslint consistent-return: 0 */
        if (moduleLoader === 'browserify') {
            result.metadata.usedHelpers.map(helper => usedBabelHelpers.push(helper));
        } else if (moduleLoader === 'requirejs') {
            return through.obj((file, enc, cb) => {
                file.babel.usedHelpers.map(helper => usedBabelHelpers.push(helper));
                cb(null, file);
            });
        }
    },

    /**
     * Write-out babel-helpers
     * @param {String[]} usedBabelHelpers - The array of babel helpers, passed by reference
     */
    writeBabelHelpers: usedBabelHelpers => { /* eslint max-statements: 0 */
        // Generate the babel helpers file
        const buildHelpers = require(`${__dirname}/../../node_modules/babel-core/lib/tools/build-external-helpers`);
        // Create babel helpers js directory and write file
        mkdirp(path.dirname(config.dist.babelHelpers));
        writeFileSync(config.dist.babelHelpers, buildHelpers(usedBabelHelpers));

        const pwd = process.cwd();
        const filename = path.relative(config.dist.base, config.dist.babelHelpers);

        // Sourcemap: Make sure the 'sourceMappingURL' is correct
        process.chdir(config.dist.base);
        const minified = uglifyjs.minify(filename, {
            outSourceMap: `${path.basename(filename)}.map`,
            sourceRoot: '/source/',
            sourceMapIncludeSources: true
        });
        process.chdir(pwd);

        // Sourcemap: Make sure the 'file' property is correct
        const sourcemap = JSON.parse(minified.map);
        sourcemap.file = filename;
        minified.map = JSON.stringify(sourcemap);

        // Write babel helpers and it's sourcemap
        writeFileSync(config.dist.babelHelpers, minified.code);
        writeFileSync(`${config.dist.babelHelpers}.map`, minified.map);
    },

    /**
     * Return a new Browserify instance
     * @param {String} src, Source entry file to initiate browserify
     * @param {Object} plugins, Source entry file to initiate browserify
     * @returns {Object} - Browserify object
     */
    getBundler: (src, plugins) => {
        // Get the babel config
        const babelrc = JSON.parse(readFileSync(`${__dirname}/../../.babelrc`, { encoding: 'utf8' }));
        const babelConfig = { presets: babelrc.presets, plugins: babelrc.env.browser.browserify.plugins };
        let bundler = browserify({
            entries: [src],
            debug: true,
            insertGlobals: true,
            cache: {},
            paths: ['./src/static/js', './src/components'],
            packageCache: {},
            fullPaths: true,
            plugin: plugins
        })
        .transform(babelify, babelConfig);

        return bundler;
    }
};

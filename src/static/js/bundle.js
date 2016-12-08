/**
 * Browserify entry for bundling
 * Modules are bundled in js gulp task
 * !!! This file is NOT used when using RequireJS
 */
import classList from 'polyfill/classList'; // eslint-disable-line no-unused-vars
import conditioner from 'conditioner-js';

/**
 * When using conditioners monitors
 * import the required monitors:
 */
//
// import 'conditioner-js/dist/min/monitors/media';

// Setup conditioner loader to load modules from bundle
conditioner.setOptions({
    loader: {
        require: (paths, callback) => {
            const module = require(paths);

            return callback(module.default ? module.default : module);
        },
        toUrl: path => path
    },
    paths: {
        monitors: 'conditioner-js/dist/min/monitors/'
    }
});

// Initialize Conditioner
conditioner.init();

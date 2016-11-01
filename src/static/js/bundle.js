/**
* Browserify entry for bundling
* Modules are bundled in js gulp task
* !!! This file is NOT used when using RequireJS
*/
import classList from 'polyfill/classList'; // eslint-disable-line no-unused-vars
import conditioner from 'conditioner-js';

// Setup conditioner loader to load modules from bundle
conditioner.setOptions({
    loader: {
        require: (paths, callback) => callback(require(paths).default),
        toUrl: path => path
    }
});

// Initialize Conditioner
conditioner.init();

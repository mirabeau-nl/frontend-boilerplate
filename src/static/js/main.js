require.config({
    map: {
        '*': {
            conditioner: 'vendor/conditionerjs/conditioner'
        }
    }
});

let polyfills = [];

/**
 * Uncomment the feature detection below to activate the polyfill in your project and expand on it to your needs.
 */

if (!('classList' in document.documentElement)) {
    polyfills.push('polyfill/classList');
}

require(['conditioner'].concat(polyfills), function(conditioner) {
    conditioner.init();
});

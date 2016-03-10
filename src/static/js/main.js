/**
 * Require.js config paths
 */
require.config({
    map: {
        '*': {
            conditioner: 'vendor/conditionerjs/conditioner'
        }
    }
});

/**
 * Determine which polyfills to load
 */
let polyfills = ['polyfill/babel-helpers'];
// if (!('classList' in document.documentElement)) {
//     polyfills.push('polyfill/classList');
// }

/**
 * Load polyfills & start Conditioner.js
 */
require(['conditioner'].concat(polyfills), conditioner => conditioner.init());

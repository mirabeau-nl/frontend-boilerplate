require.config({
    map: {
        '*': {
            conditioner: 'vendor/conditionerjs/conditioner'
        }
    }
});

/**
 * Feature detections to include polyfills if necessary.
 * Uncomment the code below to activate it in your project and expand on it to your needs.
 */

//let polyfills = [];
//
//if (!('classList' in document.documentElement)) {
//    polyfills.push('polyfill/classList');
//}

require(['conditioner'].concat(typeof polyfills !== 'undefined' ? polyfills : ''), function(conditioner) {
    conditioner.init();
});

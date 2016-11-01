/* eslint-disable */
/**
 * @module IframeHeightResizer
 */
(function() {

    'use strict';

    document.addEventListener('readystatechange', function() {

        if (document.readyState !== 'complete') {
            return;
        }

        var elems = document.querySelectorAll('[data-resize-to-height]');

        [].forEach.call(elems, function(elem) {

            // Cross-browser get iframe height
            var height = Math.max(
                elem.contentDocument.body.scrollHeight,
                elem.contentDocument.body.offsetHeight,
                elem.contentDocument.documentElement.clientHeight,
                elem.contentDocument.documentElement.scrollHeight,
                elem.contentDocument.documentElement.offsetHeight
            );

            elem.style.height = height + 'px';
        });

    });

}());

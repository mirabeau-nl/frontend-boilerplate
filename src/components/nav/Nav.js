define(function() {

    'use strict';

    /**
     * @constructor
     */
    function Nav(element, options) {
        this.element = element;
        this.options = options;
        this.load();
    }

    /**
     * Default options
     */
    Nav.options = {};

    /**
     * Construct module
     */
    Nav.prototype.load = function() {
        this.element.innerHTML += '!';
    };

    /**
     * Deconstruct module
     */
    Nav.prototype.unload = function() {};

    // Exports
    return Nav;

});

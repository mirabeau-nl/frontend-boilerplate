/**
 * @module Nav
 */
class Nav {

    /**
     * @param {HTMLElement} element
     * @param {Object} options
     */
    constructor(element, options) {
        this._element = element;
        this._options = options;
        this.load();
    }

    /**
     * Base options
     */
    static get options() {}

    /**
     * Construct module
     */
    load() {
        this._element.innerHTML += [2, 4, 6, 8, 10].map(v => v + 1);
    }

    /**
     * Deconstruct module
     */
    unload() {}
}

// Exports
export default Nav;

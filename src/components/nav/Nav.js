/**
 * @module Nav
 */
class Nav {

    /**
     * @param {HTMLElement} element - The HTMLElement this module is constructed upon
     * @param {Object} options - ConditionerJS's merged options
     */
    constructor(element, options) {
        this._element = element;
        this._options = options;
        this.load();
    }

    /**
     * Base options
     */
    static options = {};

    // /**
    //  * Construct module
    //  */
    // load() {
    // }

    /**
     * Deconstruct module
     */
    unload() {
        // unload ftw
    }
}

// Exports
export default Nav;

/**
 * @module Nav
 */
class Nav {
  /**
   * @param {HTMLElement} element - The HTMLElement this module is constructed upon
   * @param {Object} options - ConditionerJS's merged options
   */
  constructor(element, options) {
    this._element = element
    this._options = options
    this.load()
  }

  /**
   * Base options
   */
  static options = {}

  /**
   * Construct module
   */
  load() {
    this._element.innerHTML += ['a', 'b', 'c', 'd'].map(v => v.toUpperCase())
  }
}

// Exports
export default Nav

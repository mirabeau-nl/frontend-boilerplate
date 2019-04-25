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
    this._options = Object.assign(Nav.options, options)
    this.load()
  }

  /**
   * Base options
   */
  static options = {
    fetch: {
      method: 'get'
    }
  }

  /**
   * Construct module
   */
  load() {
    fetch(this._options.url, this._options.fetch)
      .then(response => response.json())
      .then(obj => {
        this._element.innerHTML += obj.data.map(v => v.toUpperCase())
      })
  }
}

// Exports
export default Nav

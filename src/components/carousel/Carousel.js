/**
 * @module Carousel
 */
class Carousel {
  /**
   * @classdesc - This module handles all the logic required for the Carousel component
   * @param {HTMLElement} element - The HTMLElement this module is constructed upon
   * @param {Object} options - The data attributes on the HTMLElement this module is constructed upon
   */
  constructor(element, options) {
    this._element = element
    this._options = { ...Carousel._defaultOptions, ...options }

    this._goToPrevPage = this._goToPrevPage.bind(this)
    this._goToNextPage = this._goToNextPage.bind(this)

    this._init()
  }

  static _defaultOptions = {
    attributes: {
      DATA_PAGE: 'data-page',
      ARIA_HIDDEN: 'aria-hidden',
      DATA_BUTTON_PREV: 'data-button-prev',
      DATA_BUTTON_NEXT: 'data-button-next',
      DATA_DIRECTION: 'data-direction'
    }
  }

  _state = {
    currIndex: 0
  }

  /**
   * Remove all event listeners that were needed
   */
  unload() {
    this._buttonPrev.removeEventListener('click', this._goToPrevPage)
    this._buttonNext.removeEventListener('click', this._goToNextPage)
  }

  /**
   * @param {Number} index - Index of page to show
   */
  _showPage(index) {
    this._pages[index].setAttribute(
      this._options.attributes.ARIA_HIDDEN,
      'false'
    )
  }

  /**
   * @param {Number} index - Index of page to hide
   */
  _hidePage(index) {
    this._pages[index].setAttribute(
      this._options.attributes.ARIA_HIDDEN,
      'true'
    )
  }

  /**
   * @param {Number} index - index of page
   */
  _goToPage(index) {
    this._hidePage(this._state.currIndex)
    this._state.currIndex = index
    this._showPage(this._state.currIndex)
  }

  /**
   * @param {Event} e - Handle click event emitted by the prev button
   */
  _goToPrevPage(e) {
    let nextIndex = this._state.currIndex - 1
    // Set nextIndex to last page if required page is negative
    if (nextIndex < 0) {
      nextIndex = this._pages.length - 1
    }

    this._goToPage(nextIndex)
    e.preventDefault()
  }

  /**
   * @param {Event} e - Handle click event emitted by the next button
   */
  _goToNextPage(e) {
    let nextIndex = this._state.currIndex + 1
    // Set nextIndex to first page if exceeding amount of pages
    if (nextIndex > this._pages.length - 1) {
      nextIndex = 0
    }

    this._goToPage(nextIndex)
    e.preventDefault()
  }

  /**
   * Add all event listeners that are needed
   */
  _addEventListeners() {
    this._buttonPrev.addEventListener('click', this._goToPrevPage)
    this._buttonNext.addEventListener('click', this._goToNextPage)
  }

  /**
   * Set the defaults that are needed
   */
  _setDefaults() {
    this._pages.forEach((page, index) => {
      // Bail out if first page
      if (index === 0) {
        return
      }

      this._hidePage(index)
    })
  }

  /**
   * Cache all selectors that are needed
   */
  _cacheSelectors() {
    this._pages = [
      ...this._element.querySelectorAll(
        `[${this._options.attributes.DATA_PAGE}]`
      )
    ]

    this._buttonPrev = this._element.querySelector(
      `[${this._options.attributes.DATA_BUTTON_PREV}]`
    )
    this._buttonNext = this._element.querySelector(
      `[${this._options.attributes.DATA_BUTTON_NEXT}]`
    )
  }

  /**
   * Inititialize module
   */
  _init() {
    this._cacheSelectors()
    this._setDefaults()
    this._addEventListeners()
  }
}

export default Carousel

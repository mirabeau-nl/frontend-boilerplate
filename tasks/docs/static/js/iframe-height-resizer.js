/**
 * @module IframeHeightResizer
 */
document.addEventListener('readystatechange', () => {
  if (document.readyState !== 'complete') {
    return
  }

  Array.prototype.forEach.call(
    document.querySelectorAll('[data-resize-to-height]'),
    elem => {
      // Cross-browser get iframe height
      const height = Math.max(
        elem.contentDocument.body.scrollHeight,
        elem.contentDocument.body.offsetHeight,
        elem.contentDocument.documentElement.clientHeight,
        elem.contentDocument.documentElement.scrollHeight,
        elem.contentDocument.documentElement.offsetHeight
      )

      elem.style.height = `${height}px`
    }
  )
})

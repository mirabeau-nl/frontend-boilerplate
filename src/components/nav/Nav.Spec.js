import assert from 'assert'
import Nav from './Nav'

describe('Nav', () => {
  describe('load()', () => {
    it('should have set the innerHTML of element to A,B,C,D', () => {
      // Arrange
      const context = { _element: { innerHTML: '' } }

      // Act
      Nav.prototype.load.apply(context)

      // Assert
      assert.strictEqual(context._element.innerHTML, 'A,B,C,D')
    })
  })
})

import assert from 'assert'
import Nav from './Nav'

describe('Nav', () => {
  describe('_placedata()', () => {
    it('should have set the innerHTML of element to A,B,C,D,E,F,G', () => {
      // Arrange
      const context = { _element: { innerHTML: '' } }

      // Act
      Nav.prototype._placeData.apply(context, [
        ['a', 'b', 'c', 'd', 'e', 'f', 'g']
      ])

      // Assert
      assert.strictEqual(context._element.innerHTML, 'A,B,C,D,E,F,G')
    })
  })
})

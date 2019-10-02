import assert from 'assert'
import Carousel from './Carousel'

// Mocks
const mockEvent = { preventDefault: () => {} }
const mockFunc = () => {}

// Setup
const amountOfPages = 10

const context = {
  _state: {
    currIndex: 0
  },
  _pages: [...Array(amountOfPages).keys()],
  _showPage: mockFunc,
  _hidePage: mockFunc,
  _goToPage: index => Carousel.prototype._goToPage.apply(context, [index])
}

describe('Carousel', () => {
  describe('_goToPage', () => {
    it('should update the current active index in state to the passed index', () => {
      // Act
      const newActiveIndex = 1
      Carousel.prototype._goToPage.apply(context, [newActiveIndex])

      // Assert
      assert.strictEqual(context._state.currIndex, newActiveIndex)
    })
  })

  describe('_goToNextPage', () => {
    it('should increase the current active index in state by 1', () => {
      // Act
      const startIndex = 0
      Carousel.prototype._goToNextPage.apply(
        { ...context, _state: { currIndex: startIndex } },
        [mockEvent]
      )

      // Assert
      assert.strictEqual(context._state.currIndex, startIndex + 1)
    })

    it('should reset the current active index to 0 if the passed index is bigger then length of pages', () => {
      // Act
      const startIndex = amountOfPages
      Carousel.prototype._goToNextPage.apply(
        { ...context, _state: { currIndex: startIndex } },
        [mockEvent]
      )

      // Assert
      assert.strictEqual(context._state.currIndex, 0)
    })
  })

  describe('_goToPrevPage', () => {
    it('should decrease the current active index in state by 1', () => {
      // Act
      const startIndex = 2
      Carousel.prototype._goToPrevPage.apply(
        { ...context, _state: { currIndex: startIndex } },
        [{ preventDefault: () => {} }]
      )

      // Assert
      assert.strictEqual(context._state.currIndex, startIndex - 1)
    })

    it('should reset the current active index to the last page if the passed index is lower then 0', () => {
      // Act
      const startIndex = amountOfPages
      Carousel.prototype._goToNextPage.apply(
        { ...context, _state: { currIndex: startIndex } },
        [mockEvent]
      )

      // Assert
      assert.strictEqual(context._state.currIndex, 0)
    })
  })
})

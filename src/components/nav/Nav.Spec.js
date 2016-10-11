import assert from 'assert';
import Nav from './Nav';

describe('Nav', () => {
    describe('load()', () => {
        it('should have set the innerHTML of element to 3,5,7,9,11', () => {
            // Arrange
            const context = { _element: { innerHTML: '' } };

            // Act
            Nav.prototype.load.apply(context);

            // Assert
            assert.strictEqual(context._element.innerHTML, '3,5,7,9,11');
        });
    });
});

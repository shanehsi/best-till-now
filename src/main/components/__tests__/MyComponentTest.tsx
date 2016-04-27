import TestUtils from 'react/lib/ReactTestUtils'
import MyComponent from '../MyComponent';

describe('<MyComponent />', () => {

  it('should not be undefined', function () {
    var Component = TestUtils.renderIntoDocument(<MyComponent />);
    var element = TestUtils.findRenderedDOMComponentWithTag(Component, 'div');
    assert.isOk(element);
  });

});

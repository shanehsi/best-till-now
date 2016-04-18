import { shallow } from 'enzyme';
import MyComponent from '../MyComponent';

describe('<MyComponent />', () => {

  it('renders children when passed in', () => {
    const wrapper = shallow(
      <MyComponent>
        <div className="unique"/>
      </MyComponent>
    );
    assert.isTrue(wrapper.contains(<div className="unique"/>));
  });

});

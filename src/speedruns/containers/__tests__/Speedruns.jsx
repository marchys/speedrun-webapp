import React from 'react';
import { shallow } from 'enzyme';

import Speedruns from '../Speedruns';

test('should render', () => {
  const wrapper = shallow(<Speedruns />);

  expect(wrapper.getElement()).not.toBe(null);
});

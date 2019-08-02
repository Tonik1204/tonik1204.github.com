import React from 'react';
import { mount } from 'enzyme';
import SunTimer from './sun-timer';

describe('SunTimer', () => {
  it('renders correctly', () => {
    const wrapper = mount(<SunTimer />);
    expect(wrapper).toBeDefined();
  });
});

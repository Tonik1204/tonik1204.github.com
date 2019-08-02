import React from 'react';
import { mount } from 'enzyme';
import Clock from './clock';

describe('Clock', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Clock />);
    expect(wrapper.find('.react-clock')).toHaveLength(1);
  });
});

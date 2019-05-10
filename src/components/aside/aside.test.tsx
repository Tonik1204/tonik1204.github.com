import React from 'react';
import { mount } from 'enzyme';
import Aside from './aside';

describe('Aside', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Aside />);
    expect(wrapper.find('.react-clock')).toHaveLength(1);
  });
});

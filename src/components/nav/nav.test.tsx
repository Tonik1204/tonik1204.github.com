import React from 'react';
import { mount } from 'enzyme';
import Nav from './nav';

describe('Nav', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Nav />);
    expect(wrapper.find('.nav-signup')).toHaveLength(1);
    expect(wrapper.find('.nav-login')).toHaveLength(1);
  });
});

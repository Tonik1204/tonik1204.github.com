import React from 'react';
import { mount } from 'enzyme';
import Header from './header';

describe('Header', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find('button.app-menu-button')).toHaveLength(1);
    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find('h1').text()).toBe('Weather');
  });
});

import React from 'react';
import { mount } from 'enzyme';
import Toast from './toast-container';

describe('Search', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Toast />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});

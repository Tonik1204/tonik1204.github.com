import React from 'react';
import { mount } from 'enzyme';
import Footer from './footer';

describe('Footer', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Footer />);
    expect(wrapper.text()).toBe(
      'All times are CEST (Europe/Warsaw, GMT +0200) unless otherwise stated.',
    );
  });
});

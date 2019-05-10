import React from 'react';
import { mount } from 'enzyme';
import Main from './main';

describe('Main', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Main />);
    expect(wrapper).toBeDefined();
  });
});

import React from 'react';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Search from './search';

describe('Search', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Search />);
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('input').prop('name')).toEqual('search');
    expect(wrapper.find('.dropdown')).toHaveLength(0);
  });

  it('handels search value correctly', () => {
    const wrapper = document.createElement('div');
    ReactDOM.render(<Search />, wrapper);
    const input = wrapper.querySelector('input');
    TestUtils.Simulate.change(input, { target: { value: 'Peter Parker' } });
    expect(input.value).toEqual('Peter Parker');
  });
});

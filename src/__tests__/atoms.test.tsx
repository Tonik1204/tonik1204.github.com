import React from 'react';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import AppTitle from 'atoms/app-title';
import Dropdown from 'atoms/dropdown';
import IconButton from 'atoms/icon-button';
import IconData from 'atoms/icon-data';
import Input from 'atoms/input';
import Spinner from 'atoms/spinner';
import ToastMessage from 'atoms/toast-message';
import WarningText from 'atoms/warning-text';

const dropdownData = [{ id: 1, name: 'test1' }, { id: 2, name: 'test2' }];

describe('AppTitle', () => {
  it('renders correctly', () => {
    const wrapper = mount(<AppTitle>Test</AppTitle>);
    expect(wrapper.text()).toBe('Test');
  });
});

describe('Dropdown', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Dropdown items={dropdownData} />);

    expect(wrapper.find('.dropdown-item')).toHaveLength(dropdownData.length);
    expect(
      wrapper
        .find('.dropdown-item')
        .at(0)
        .text(),
    ).toBe(dropdownData[0].name);
    expect(
      wrapper
        .find('.dropdown-item')
        .at(1)
        .text(),
    ).toBe(dropdownData[1].name);
  });

  it('handles select correctly', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Dropdown items={dropdownData} onSelect={mockFn} />);

    wrapper
      .find('.dropdown-item')
      .at(0)
      .simulate('mousedown');
    wrapper
      .find('.dropdown-item')
      .at(1)
      .simulate('mousedown');

    expect(mockFn.mock.calls[0][0]).toBe(dropdownData[0]);
    expect(mockFn.mock.calls[1][0]).toBe(dropdownData[1]);
  });
});

describe('IconButton', () => {
  it('renders correctly', () => {
    const wrapper = document.createElement('div');
    ReactDOM.render(<IconButton />, wrapper);

    expect(wrapper.querySelectorAll('img')).toHaveLength(1);
    expect(wrapper.querySelectorAll('.icon-button')).toHaveLength(1);
  });

  it('handles size prop correctly', () => {
    const wrapper = document.createElement('div');
    const wrapperDefaultProp = document.createElement('div');

    ReactDOM.render(<IconButton size="xl" />, wrapper);
    ReactDOM.render(<IconButton />, wrapperDefaultProp);

    expect(wrapper.querySelectorAll('.xl')).toHaveLength(1);
    expect(wrapperDefaultProp.querySelectorAll('.md')).toHaveLength(1);
  });
});

describe('IconData', () => {
  it('renders correctly', () => {
    const wrapper = document.createElement('div');
    ReactDOM.render(<IconData data="test" />, wrapper);

    expect(wrapper.querySelectorAll('img')).toHaveLength(1);
    expect(wrapper.querySelectorAll('.data')).toHaveLength(1);
    expect(wrapper.querySelectorAll('.icon-data')).toHaveLength(1);

    expect(wrapper.querySelector('.data').innerHTML).toBe('test');
  });

  it('handles size prop correctly', () => {
    const wrapper = document.createElement('div');
    const wrapperDefaultProp = document.createElement('div');

    ReactDOM.render(<IconData size="xs" />, wrapper);
    ReactDOM.render(<IconData />, wrapperDefaultProp);

    expect(wrapper.querySelectorAll('.xs')).toHaveLength(1);
    expect(wrapperDefaultProp.querySelectorAll('.md')).toHaveLength(1);
  });
});

describe('Input', () => {
  it('renders correctly', () => {
    const wrapper = mount(<Input />);
    expect(wrapper).toBeDefined();
  });
});

describe('Spinner', () => {
  it('renders correctly', () => {
    const wrapper = document.createElement('div');
    ReactDOM.render(<Spinner />, wrapper);

    expect(wrapper.querySelectorAll('img')).toHaveLength(1);
    expect(wrapper.querySelectorAll('.spinner')).toHaveLength(1);
  });

  it('handles size prop correctly', () => {
    const wrapper = document.createElement('div');
    const wrapperDefaultProp = document.createElement('div');

    ReactDOM.render(<Spinner size="xl" />, wrapper);
    ReactDOM.render(<Spinner />, wrapperDefaultProp);

    expect(wrapper.querySelectorAll('.xl')).toHaveLength(1);
    expect(wrapperDefaultProp.querySelectorAll('.md')).toHaveLength(1);
  });
});

describe('ToastMessage', () => {
  it('renders correctly', () => {
    const wrapper = mount(<ToastMessage>Test</ToastMessage>);
    expect(wrapper.text()).toBe('Test');
  });
});

describe('WarningText', () => {
  it('renders correctly', () => {
    const wrapper = mount(<WarningText>Test</WarningText>);
    expect(wrapper.text()).toBe('Test');
  });
});

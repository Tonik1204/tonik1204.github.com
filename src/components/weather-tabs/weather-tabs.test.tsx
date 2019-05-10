import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Tabs from './tabs';
import TabItem from './tab-item';
import TabContent from './tab-content';
import WeatherTabs from './weather-tabs';

const tabsMock = [
  {
    id: 0,
    date: 'Thu May 09 2019 22:40:45',
    weather_icon: '01n',
    description: 'cloudly',
    temp: 20,
    clouds: 25,
    humidity: 10,
    pressure: 1000,
    wind_deg: 230,
    wind_speed: 0,
    fallout: 0,
  },
  {
    id: 1,
    date: 'Thu May 09 2019 22:45:45',
    weather_icon: '01d',
    description: 'sunny',
    temp: 22,
    clouds: 25,
    humidity: 11,
    pressure: 2500,
    wind_deg: 230,
    wind_speed: 0,
    fallout: 0,
  },
];

describe('WeatherTabsWrapper', () => {
  it('renders correctly', () => {
    const wrapper = document.createElement('div');
    ReactDOM.render(<WeatherTabs />, wrapper);
    expect(wrapper.querySelectorAll('.spinner')).toHaveLength(1);
  });
});

describe('WeatherTabs', () => {
  it('renders with props', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Tabs tabs={tabsMock} setTabContent={mockFn} />);
    expect(
      wrapper
        .find('.description')
        .at(0)
        .text(),
    ).toBe('cloudly');
  });

  it('handles active correctly', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Tabs tabs={tabsMock} setTabContent={mockFn} />);

    expect(wrapper.find('.active')).toHaveLength(1);
    wrapper
      .find('.tab')
      .at(0)
      .simulate('click');
    expect(wrapper.find('.active')).toHaveLength(1);
  });

  it('handles clicks correctly', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Tabs tabs={tabsMock} setTabContent={mockFn} />);

    expect(mockFn).toHaveBeenCalledTimes(1);

    wrapper
      .find('.tab')
      .at(0)
      .simulate('click');
    wrapper
      .find('.tab')
      .at(1)
      .simulate('click');

    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it('handles content correctly', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Tabs tabs={tabsMock} setTabContent={mockFn} />);

    expect(wrapper.find('.tabs-menu-content')).toHaveLength(1);

    expect(mockFn.mock.calls[0][0].id).toBe(tabsMock[0].id);

    wrapper
      .find('.tab')
      .hostNodes()
      .at(1)
      .simulate('click');

    expect(mockFn.mock.calls[1][0].id).toBe(tabsMock[1].id);
  });
});

describe('WeatherTabItem', () => {
  it('renders with props', () => {
    const wrapper = mount(<TabItem data={tabsMock} />);
    expect(wrapper.find('.date').text()).toBe(
      moment(tabsMock.date).format('ddd, Do'),
    );
  });
});

describe('WeatherTabContent', () => {
  it('renders with props', () => {
    const wrapper = mount(<TabContent data={tabsMock} />);
    expect(
      wrapper
        .find('.humidity .data')
        .at(1)
        .text(),
    ).toBe(tabsMock[1].humidity + '%');
    expect(
      wrapper
        .find('.pressure .data')
        .at(0)
        .text(),
    ).toBe(tabsMock[0].pressure + ' hpa');
  });
});

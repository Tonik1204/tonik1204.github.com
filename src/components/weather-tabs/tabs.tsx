import React from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';
import { WeatherTabItem } from './weather-tabs';
import { device, isDayTime } from 'config/config';
import TabItem from './tab-item';

interface TabsProps {
  className?: string;
  tabs: WeatherTabItem[];
  setTabContent?: (selectedTab: WeatherTabItem) => JSX.Element;
  switchTabHandler?: (event: any) => void;
  defaultSelectedTab?: WeatherTabItem;
}

interface TabsState {
  selectedTab: WeatherTabItem;
}

class Tabs extends React.Component<TabsProps, TabsState> {
  state = {
    selectedTab: this.props.defaultSelectedTab || this.props.tabs[0],
  };

  handleSwitchTab = (selectedTab: WeatherTabItem) => () => {
    const { switchTabHandler } = this.props;

    this.setState({ selectedTab });
    switchTabHandler && switchTabHandler(selectedTab);
  };

  render() {
    const { className, setTabContent, tabs } = this.props;
    const { selectedTab } = this.state;

    return (
      <div className={className}>
        <div className="tabs-menu">
          <div className="tabs-menu-wrap">
            {tabs.map((tab, key) => (
              <div
                key={key}
                className={`tab ${tab.id === selectedTab.id ? 'active' : ''}`}
                onClick={this.handleSwitchTab(tab)}
              >
                <TabItem data={tab} />
              </div>
            ))}
          </div>
        </div>
        {setTabContent && (
          <div className="tabs-menu-content">{setTabContent(selectedTab)}</div>
        )}
      </div>
    );
  }
}

const StyledTabs = styled(Tabs)`
  width: 100%;

  .tabs-menu {
    cursor: pointer;
    margin: 5rem 5rem 0 6rem;

    .tabs-menu-wrap {
      display: flex;
      height: 11rem;
      align-items: center;
      font-size: 1.2rem;
      padding: 0 1.75rem;
      overflow: auto;

      @media ${device.desktop} {
        font-size: 1rem;
      }

      @media ${device.laptop} {
        font-size: 0.9rem;
      }

      @media ${device.mobile} {
        font-size: 0.7rem;
      }

      .tab {
        color: ${colors.text};
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 9rem;
        min-width: 0;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border: 1px solid ${colors.grey900};
        background-color: ${colors.white};
        text-transform: capitalize;
        transition: transform 0.2s;
        height: 9rem;

        :not(.active) {
          border-bottom: 0.3rem solid
            ${isDayTime ? colors.purpure : colors.lightBlue500};
          box-shadow: 10px 10px 5px 0px
            ${isDayTime ? colors.blue500 : colors.black800};

          :not(:first-child) {
            border-left: 0;
          }
          :hover {
            transform: scale(1.1);
            z-index: 1;
            border-left: 1px solid ${colors.grey900};
          }
        }
      }
    }

    .tabs-menu-wrap .active {
      color: ${colors.blue600};
      transform: scale(1.2) translate(-0.5rem);
      cursor: default;
      border-top: 0.5rem solid ${isDayTime ? colors.green500 : colors.green300};
    }
  }

  .tabs-menu-content {
    margin: 5rem 3rem;

    @media ${device.laptop} {
      margin: 5rem 1rem;
    }
  }
`;

export default StyledTabs;

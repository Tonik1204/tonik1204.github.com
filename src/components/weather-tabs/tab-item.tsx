import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import config, { symbols } from 'config/config';
import { WeatherTabItem } from './weather-tabs';
import { convertKelvinToCelsius } from 'utils/helper';

interface Props {
  className?: string;
  data: WeatherTabItem;
}

const TabItem = (props: Props): JSX.Element => {
  const {
    className,
    data: { weather_icon, max, min, date, description },
  } = props;

  return (
    <div className={className}>
      <section>
        <strong className="date">{moment(date).format('ddd, Do MMM')}</strong>
        <img
          src={`${config.forecast_icons_url}${weather_icon}.png`}
          alt={description}
        />
      </section>
      <section>
        <div className="temp">
          <strong>
            {convertKelvinToCelsius(max)} {symbols.celsius}
          </strong>
          <div>
            {convertKelvinToCelsius(min)} {symbols.celsius}
          </div>
        </div>
        <div className="description">{description}</div>
      </section>
    </div>
  );
};

const StyledTabItem = styled(TabItem)`
  display: flex;
  align-items: center;
  justify-content: center;

  section {
    margin: 0 0.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .temp {
    margin-bottom: 0.3rem;
    text-align: right;
    font-size: 1.25rem;
    white-space: pre;
  }
`;

export default StyledTabItem;

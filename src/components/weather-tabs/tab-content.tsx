import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import config, { symbols, isDayTime } from 'config/config';
import colors from 'styles/colors';
import { WeatherItem } from './weather-tabs';
import { convertKelvinToCelsius } from 'utils/helper';
import IconData from 'atoms/icon-data';
import termIcon from 'assets/icons/term.png';
import cloudsIcon from 'assets/icons/clouds.png';
import humidityIcon from 'assets/icons/humidity.png';
import pressureIcon from 'assets/icons/pressure.png';
import windDegIcon from 'assets/icons/wind_deg.png';
import windSpeedIcon from 'assets/icons/wind_speed.png';
import falloutIcon from 'assets/icons/fallout.png';

export interface Props {
  className?: string;
  data: WeatherItem[];
}

const TabContent = (props: Props): JSX.Element => {
  const { className, data } = props;

  return (
    <div className={className}>
      {data.map((item, key) => (
        <section key={key}>
          <strong>{moment(item.date).format('HH:mm')}</strong>
          <div>
            <img
              src={`${config.forecast_icons_url}${item.weather_icon}.png`}
              alt={item.description}
            />
          </div>
          <IconData
            src={termIcon}
            alt="temperature"
            data={
              <strong>
                {convertKelvinToCelsius(item.temp)} {symbols.celsius}
              </strong>
            }
          />
          <IconData src={cloudsIcon} alt="clouds" data={`${item.clouds}%`} />
          <IconData
            src={humidityIcon}
            alt="humidity"
            className="humidity"
            data={`${item.humidity}%`}
          />
          <IconData
            src={pressureIcon}
            alt="pressure"
            className="pressure"
            data={`${Math.round(item.pressure)} hpa`}
          />
          <IconData
            src={windSpeedIcon}
            alt="wind speed"
            data={
              <React.Fragment>
                <div>{`${item.wind_speed} m/s`}</div>
                <img
                  src={windDegIcon}
                  alt="wind direction"
                  className="wind-direction"
                  style={{ transform: `rotate(${item.wind_deg + 180}deg)` }}
                />
              </React.Fragment>
            }
          />
          <IconData
            src={falloutIcon}
            alt="fallout"
            data={`${item.fallout || 0} mm`}
          />
        </section>
      ))}
    </div>
  );
};

const StyledTabContent = styled(TabContent)`
  display: flex;
  align-items: center;
  overflow: auto;
  background-color: ${colors.white900};
  padding: 1.5rem;
  border-top: 1rem solid ${isDayTime ? colors.blue100 : colors.grey900};
  box-shadow: 10px 10px 5px 0px ${isDayTime ? colors.blue500 : colors.black900};

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 8rem;
    min-width: 0;
    padding: 0 1rem;
    border-left: 1px solid ${colors.grey700};

    &:first-child {
      border-left: 0;
    }
  }

  strong {
    white-space: pre;
  }

  .wind-direction {
    width: 2rem;
    height: 2rem;
    margin-top: 0.25rem;
  }
`;

export default StyledTabContent;
